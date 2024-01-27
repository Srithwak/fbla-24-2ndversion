const { getJSON, getObj, findNextID, uploadJSON} = require('../helper/helper');
const path = require('path');
const userTable = document.getElementById("userTable");

function displayTable(accountData = getJSON(path.join(__dirname, '../../database/accounts.json'))) {
    userTable.innerHTML = "";
    // Check if there are rows in the table
    if (userTable.rows.length === 0) {
        // Create header row
        const headerRow = userTable.insertRow();
        const headerCells = ['Username', 'Description', 'Email', 'Phone', 'Website', 'Social Media', 'Action'];

        // Insert header cells
        for (const headerText of headerCells) {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        }
    }
    if (getObj(localStorage.getItem('id')).associated != undefined)
        for (userObject of accountData) {
            if (userObject.associated == undefined && userObject.visibility == 'public') {
                // Create a new row
                const newRow = userTable.insertRow();

                // Insert cells into the row
                const usernameCell = newRow.insertCell(0);
                const descriptionCell = newRow.insertCell(1);
                const emailCell = newRow.insertCell(2);
                const phoneCell = newRow.insertCell(3);
                const websiteCell = newRow.insertCell(4);
                const socialMediaCell = newRow.insertCell(5);
                const actionCell = newRow.insertCell(6);

                // Populate cells with user information
                let arr1 = [];
                if (getObj(localStorage.getItem('id')).associated != undefined) {
                    for (i of getObj(localStorage.getItem('id')).associated)
                        arr1.push(i.id);
                    if (arr1.includes(userObject.id))
                        usernameCell.innerText = userObject.username + " (Associated Partner)";
                    else
                        usernameCell.innerText = userObject.username;
                }
                descriptionCell.innerText = userObject.description;
                emailCell.innerText = userObject.email;
                phoneCell.innerText = userObject.phone;
                websiteCell.innerText = userObject.website;
                socialMediaCell.innerText = userObject.socialMedia.join(', ');

                // Create a button
                const newButton = document.createElement('button');
                newButton.textContent = 'Send partner request';

                // Use a closure to capture the correct userObject for each iteration
                newButton.addEventListener('click', (function (userId) {
                    return function () {
                        // Call the addPartner function and pass the user's id number
                        addPartner(userId);
                    };
                })(userObject.id));

                const newDeleteButton = document.createElement('button');
                newDeleteButton.textContent = 'Remove partner request';
                newDeleteButton.addEventListener('click', (function (userId) {
                    return function () {
                        // Call the addPartner function and pass the user's id number
                        deletePartner(userId);
                    };
                })(userObject.id));

                // Append the button to the action cell
                if (!arr1.includes(userObject.id))
                    actionCell.appendChild(newButton);
                else
                    actionCell.appendChild(newDeleteButton);
            }
        }
    else {
        let arr1 = [];
        for (userObject of accountData)
            if (userObject.associated != undefined)
                for (i of userObject.associated)
                    if (i.id == localStorage.getItem('id'))
                        arr1.push(userObject.id);
        for (userObject of accountData)
            if (userObject.associated != undefined) {
                const newRow = userTable.insertRow();
                const usernameCell = newRow.insertCell(0);
                const descriptionCell = newRow.insertCell(1);
                const emailCell = newRow.insertCell(2);
                const phoneCell = newRow.insertCell(3);
                const websiteCell = newRow.insertCell(4);
                const socialMediaCell = newRow.insertCell(5);
                const actionCell = newRow.insertCell(6);
                usernameCell.innerText = userObject.username;
                descriptionCell.innerText = userObject.description;
                emailCell.innerText = userObject.email;
                phoneCell.innerText = userObject.phone;
                websiteCell.innerText = userObject.website;
                socialMediaCell.innerText = userObject.socialMedia.join(', ');
                // Create a button
                const newButton = document.createElement('button');
                newButton.textContent = 'Send partner request';

                // Use a closure to capture the correct userObject for each iteration
                newButton.addEventListener('click', (function (userId) {
                    return function () {
                        // Call the addPartner function and pass the user's id number
                        addPartner(userId);
                    };
                })(userObject.id));

                const newDeleteButton = document.createElement('button');
                newDeleteButton.textContent = 'Remove partner request';
                newDeleteButton.addEventListener('click', (function (userId) {
                    return function () {
                        // Call the addPartner function and pass the user's id number
                        deletePartner(userId);
                    };
                })(userObject.id));

                // Append the button to the action cell
                if (!arr1.includes(userObject.id))
                    actionCell.appendChild(newButton);
                else
                    actionCell.appendChild(newDeleteButton);
            }
    }
}

function filter() {
    const usernameFilter = document.getElementById('usernameFilter').value.toLowerCase();
    const descriptionFilter = document.getElementById('descriptionFilter').value.toLowerCase();
    const emailFilter = document.getElementById('emailFilter').value.toLowerCase();
    const phoneFilter = document.getElementById('phoneFilter').value;
    const websiteFilter = document.getElementById('websiteFilter').value.toLowerCase();

    let data = getJSON(path.join(__dirname, '../../database/accounts.json'));

    // Create a new array with filtered elements
    const filteredData = data.filter(userObject => {
        const usernameMatch = userObject.username.toLowerCase().includes(usernameFilter);
        const descriptionMatch = userObject.description.toLowerCase().includes(descriptionFilter);
        const emailMatch = userObject.email.toLowerCase().includes(emailFilter);
        const websiteMatch = userObject.website.toLowerCase().includes(websiteFilter);
        const phoneMatch = userObject.phone.toString().includes(phoneFilter);
        return usernameMatch && descriptionMatch && emailMatch && websiteMatch && phoneMatch;
    });

    displayTable(filteredData);
}

function addPartner(userId) {
    // Do something with the userId, for example, log it to the console
    // console.log(`Partner ${getObj(userId).username} requested for ${getObj(localStorage.getItem('id')).username}`);
    // send a message to the partner
    let obj = {
        "id": findNextID(path.join(__dirname, '../../database/messages.json')),
        "fromId": (getObj(localStorage.getItem('id')).id),
        "toId": userId,
        "type": "affiliateApproval",
        "notes": "",
        "hashKey": ""
    };
    let data = getJSON(path.join(__dirname, '../../database/messages.json'));
    data.push(obj);
    uploadJSON(path.join(__dirname, '../../database/messages.json'), data);
}

function deletePartner(userId) {
    console.log(`Partner ${getObj(userId).username} removed for ${getObj(localStorage.getItem('id')).username}`);
}

displayTable();
