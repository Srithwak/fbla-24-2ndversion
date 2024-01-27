const { getObj, uploadJSON, getJSON, getObjUser, findElementById } = require('../helper/helper');
const path = require('path');
// const accountData = getJSON(path.join(__dirname, '../database/accounts.json'));

function displayAssociated(loggedInAccount = getJSON(path.join(__dirname, '../../database/accounts.json')).find(account => account.id === parseInt(localStorage.getItem('id'), 10))) {
    // Retrieve the logged-in user's ID from localStorage
    const loggedInId = localStorage.getItem('id');
    if (!loggedInAccount) location.href = 'login.html'; // Exit if no account matches

    // Clear the existing table content
    const table = document.getElementById('gridTable');
    table.innerHTML = ''; // This clears the table

    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = ['Username', 'Money', 'Resources', 'Notes'];

    // Insert header cells with text content
    headers.forEach((headerText, index) => {
        const headerCell = headerRow.insertCell(index);
        headerCell.textContent = headerText;
    });
    // Function to add rows to the table for 'associated'
    if (loggedInAccount.associated != undefined) {
        loggedInAccount.associated.forEach(assoc => {
            const row = table.insertRow();
            const username = getObj(assoc.id).username; // Retrieve the username using the provided function

            // Insert editable cells for username, money, resources, and details
            row.insertCell(0).textContent = username;
            const moneyCell = row.insertCell(1);
            moneyCell.contentEditable = true;
            moneyCell.textContent = assoc.money;

            const resourcesCell = row.insertCell(2);
            resourcesCell.contentEditable = true;
            resourcesCell.textContent = assoc.resources;

            const detailsCell = row.insertCell(3);
            detailsCell.contentEditable = true;
            detailsCell.textContent = assoc.details;

            // Create a delete button and insert it into the fifth cell
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Cancel Partnership';
            deleteButton.onclick = function () {
                row.remove(); // This removes the row from the table
            };
            row.insertCell(4).appendChild(deleteButton);

            const messageButton = document.createElement('button');
            messageButton.textContent = 'Message';
            messageButton.onclick = function () {
                pop(username);
            };
            row.insertCell(4).appendChild(messageButton);
        });

        // Function to add rows to the table for 'otherAssociated'
        loggedInAccount.otherAssociated.forEach(assoc => {
            const row = table.insertRow();

            // Insert editable cells for username (with note), money, resources, and details
            row.insertCell(0).textContent = `${assoc.username} (account not listed)`;
            const moneyCell = row.insertCell(1);
            moneyCell.contentEditable = true;
            moneyCell.textContent = assoc.money;

            const resourcesCell = row.insertCell(2);
            resourcesCell.contentEditable = true;
            resourcesCell.textContent = assoc.resources;

            const detailsCell = row.insertCell(3);
            detailsCell.contentEditable = true;
            detailsCell.textContent = assoc.details;

            // Create a delete button and insert it into the fifth cell
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Cancel Partnership';
            deleteButton.onclick = function () {
                row.remove(); // This removes the row from the table

            };
            row.insertCell(4).appendChild(deleteButton);
        });
    } else {
        let arr = [];
        let data = getJSON(path.join(__dirname, '../../database/accounts.json'));
        for(let i = 0; i < data.length; i++)
            if(data[i].associated != undefined)
                for(let p = 0; p < data[i].associated.length; p++)
                    if(data[i].associated[p].id == loggedInId){
                        let obj = data[i].associated[p];
                        obj.id = data[i].id;
                        arr.push(data[i].associated[p]);
                    }
        arr.forEach(assoc => {
            const row = table.insertRow();
            const username = getObj(assoc.id).username; // Retrieve the username using the provided function

            // Insert editable cells for username, money, resources, and details
            row.insertCell(0).textContent = username;
            const moneyCell = row.insertCell(1);
            moneyCell.contentEditable = true;
            moneyCell.textContent = assoc.money;

            const resourcesCell = row.insertCell(2);
            resourcesCell.contentEditable = true;
            resourcesCell.textContent = assoc.resources;

            const detailsCell = row.insertCell(3);
            detailsCell.contentEditable = true;
            detailsCell.textContent = assoc.details;

            // Create a delete button and insert it into the fifth cell
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Cancel Partnership';
            deleteButton.onclick = function () {
                row.remove(); // This removes the row from the table
            };
            row.insertCell(4).appendChild(deleteButton);

            const messageButton = document.createElement('button');
            messageButton.textContent = 'Message';
            messageButton.onclick = function () {
                pop(username);
            };
            row.insertCell(4).appendChild(messageButton);
        });
    }
}

function saveChanges() {
    const table = document.getElementById('gridTable');
    const rows = table.rows;
    let filteredAssociatedData = [];
    let filteredOtherAssociatedData = [];
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].cells;
        if (!cells[0].textContent.includes('(account not listed)')) {
            filteredAssociatedData.push({
                id: getObjUser(cells[0].textContent).id,
                money: parseInt(cells[1].textContent),
                resources: cells[2].textContent,
                details: cells[3].textContent
            });
        } else {
            filteredOtherAssociatedData.push({
                username: cells[0].textContent.replace('(account not listed)'),
                money: parseInt(cells[1].textContent),
                resources: cells[2].textContent,
                details: cells[3].textContent
            });
        }
    }
    //if filtered and then the changes are saved, then everything else that is not displayed will
    //be removed, we dont want that, instead you should check the ids that are there, if the id
    //isnt present, store the id in an array called canceledArr, and if the changes are made, save 
    //the entire object of that into an array called changedArr
    let accountData = getJSON(path.join(__dirname, '../../database/accounts.json'));
    let changedFilteredArr = [];
    let allUsernames = [];
    let filteredUsernames = [];
    for (i of filteredAssociatedData)
        filteredUsernames.push(getObj(i.id).username);
    for (i of getObj(localStorage.getItem('id')).associated)
        allUsernames.push(getObj(i.id).username);
    for (i of allUsernames)
        if (!filteredUsernames.includes(i))
            for (p of accountData[findElementById(localStorage.getItem('id'))].associated) {
                if (getObj(p.id).username == i)
                    changedFilteredArr.push(p);
            }
    console.log(changedFilteredArr);



    for (let i = 0; i < accountData.length; i++) {
        if (accountData[i].id == localStorage.getItem('id')) {
            accountData[i].associated = filteredAssociatedData;
            accountData[i].otherAssociated = filteredOtherAssociatedData;
            break;
        }
    }
    // uploadJSON(path.join(__dirname, '../database/accounts.json'), accountData);
    // console.log('Associated Data:', filteredAssociatedData); // Log the current state of the 'associated' accounts
    // console.log('Other Associated Data:', filteredOtherAssociatedData); // Log the current state of 'otherAssociated' accounts
}

function filter() {
    const usernameFilter = document.getElementById('usernameFilter');
    const moneyFilter = parseInt(document.getElementById('moneyFilter').value); // Parse the moneyFilter value
    const resourcesFilter = document.getElementById('resourcesFilter');
    const notesFilter = document.getElementById('notesFilter');
    const radios = document.getElementsByName('fav_language');
    let selectedValue = '';
    for (let i = 0; i < radios.length; i++)
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    let accountData = getObj(localStorage.getItem('id'));
    let associated = accountData.associated;
    let otherAssociated = accountData.otherAssociated;
    for (let i = 0; i < associated.length; i++) {
        if (
            !getObj(associated[i].id).username.includes(usernameFilter.value) ||
            !associated[i].details.includes(notesFilter.value) ||
            !associated[i].resources.includes(resourcesFilter.value) ||
            (selectedValue == 'less' && moneyFilter <= associated[i].money) || // Use selectedValue for comparison
            (selectedValue == 'greater' && moneyFilter >= associated[i].money) // Use selectedValue for comparison
        ) {
            associated.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < otherAssociated.length; i++) {
        if (
            !otherAssociated[i].username.includes(usernameFilter.value) ||
            !otherAssociated[i].details.includes(notesFilter.value) ||
            !otherAssociated[i].resources.includes(resourcesFilter.value) ||
            (selectedValue == 'less' && moneyFilter <= otherAssociated[i].money) || // Use selectedValue for comparison
            (selectedValue == 'greater' && moneyFilter >= otherAssociated[i].money) // Use selectedValue for comparison
        ) {
            otherAssociated.splice(i, 1);
            i--;
        }
    }
    accountData.associated = associated;
    accountData.otherAssociated = otherAssociated;
    displayAssociated(accountData);
}

function pop(username) {
    var popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
}

function message() {
    document.getElementById("myPopup").style.visibility = "visible";
}

function closePopup() {
    document.getElementById("myPopup").style.visibility = "hidden";
}

displayAssociated();
