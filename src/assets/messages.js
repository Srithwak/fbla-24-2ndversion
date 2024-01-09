const assert = require('assert');
const { getJSON, getObj, uploadJSON, findNextID } = require('./helper/helper');
const path = require('path');
//getJSON(path.join(__dirname, '../database/accounts.json'))

function populateTable(messages) {
    let allMessages = getJSON(path.join(__dirname, '../database/messages.json'));
    if (messages == undefined) {
        messages = [];
        for (i of allMessages)
            if (i.toId == localStorage.getItem('id'))
                messages.push(i);
    }
    // console.log(messages)
    const tableBody = document.getElementById("messageTableBody");
    tableBody.innerHTML = "";

    messages.forEach(function (message) {
        const row = tableBody.insertRow();

        // From ID
        const cell1 = row.insertCell(0);
        cell1.innerHTML = getObj(message.fromId).username || "";

        // To ID
        const cell2 = row.insertCell(1);
        cell2.innerHTML = getObj(message.toId).username || "";

        // Type
        const cell3 = row.insertCell(2);
        cell3.innerHTML = message.type || "";
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        // if(message.type == 'changeApproval'){
        // Money
        cell4.innerHTML = message.money || "";
        // Resources
        cell5.innerHTML = message.resources || "";
        // }

        // Notes
        const cell6 = row.insertCell(5);
        cell6.innerHTML = message.notes || "";

        // Action
        const cell7 = row.insertCell(6);
        if (message.type != 'message' && message.type != 'partnershipTerminate')
            cell7.innerHTML = createActionButton(message.type, message.id) + createActionButton("delete", message.id);
        else
            cell7.innerHTML = createActionButton('delete', message.id)
    });
}

function createActionButton(messageType, messageId) {
    let buttonType = getButtonText(messageType);
    return `<button onclick="handleAction('${buttonType}', ${messageId})">${buttonType}</button>`;
}

/*
Step 1: either the school account or a partner account can send a request to partner up
with the other account, once the account accepts it after looking at the message and also writing 
back a message, they are considered to be partners. This process will be called affiliateApproval
Step 2: The initial account can then send them details, like the money and resources they are 
willing to offer, and then the other account can then either accept it or not. Likewise, the other
account can also send the details of the partnership to see if the inital account can accept. This 
process is called changeApproval. This process can be done as many times as
needed considering that the details of the partnership are meant to be changed over time.
Step 3: Any account can send messages to the other one without needing to provide money and 
resources values
Step 4: Any account can also terminate patnership of the other, there is no need for approval for 
this step, the other account will only be notified about what happened
*/

/*
affiliateApproval:{
    "id": 0,
    "fromId": 0,
    "toId": 2,
    "type": "affiliateApproval",
    "notes": "notes1",
    "hashKey": ""
}
changeApproval:{
    "id": 1,
    "fromId": 0,
    "toId": 2,
    "type": "changeApproval",
    "money": 10,
    "resources": "",
    "notes": "notes2",
    "hashKey": ""
}
partnershipTerminate:{
    "id": 2,
    "fromId": 0,
    "toId": 2,
    "type": "partnershipTerminate",
    "notes": "notes2",
    "hashKey": ""
}
message:{
    "id": 3,
    "fromId": 0,
    "toId": 2,
    "type": "message",
    "notes": "notes3",
    "hashKey": ""
}
*/

function getButtonText(messageType) {
    // Adjust button text based on message types
    switch (messageType) {
        case "affiliateApproval":
            return "Accept Partner";
        case "changeApproval":
            return "Accept Change";
        // case "partnershipTerminate": 
        //     return "";
        // case "message":
        //     return "n/a"; // No action for plain messages
        case 'delete':
            return 'Delete';
    }
}

function replaceAccountGivenId(obj, file = path.join(__dirname, '../database/accounts.json')) {
    let accounts = getJSON(file);
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == obj.id) {
            accounts[i] = obj;
        }
    }
    // console.log(accounts);
    uploadJSON(path.join(__dirname, '../database/accounts.json'), accounts);
}

function handleAction(buttonType, messageId) {
    // Implement your logic based on the action and message type
    let accounts = getJSON(path.join(__dirname, '../database/accounts.json'));
    let allMessages = getJSON(path.join(__dirname, '../database/messages.json'));
    let message;
    for (i of allMessages) {
        if (i.id == messageId) {
            message = allMessages[messageId];
            break;
        }
    }
    let account;
    let otherId;
    if (getObj(message.fromId).otherAssociated != null) {
        account = getObj(message.fromId);
        otherId = message.toId;
    }
    else {
        account = getObj(message.toId);
        otherId = message.fromId;
    }
    // console.log(buttonType);
    if (buttonType == "Accept Partner") {
        //add to the associated list of the toId
        //send a message saying that it has been approved
        account.associated.push({
            id: findNextID(account.associated),
            money: 0,
            resources: '',
            details: ''
        });
        replaceAccountGivenId(account);
    } else if (buttonType == "Accept Change") {
        //find the school account, and then change the money and resources values
        account.associated[otherId].money = message.money;
        account.associated[otherId].resources = message.resources;
        replaceAccountGivenId(account);
    } else if (buttonType == "Delete") {
        for (let i = 0; i < allMessages.length; i++)
            if (allMessages[i].id == message.id)
                allMessages.splice(i, 1);
        uploadJSON(path.join(__dirname, '../database/messages.json'), allMessages);
        populateTable()
    }
}

populateTable();