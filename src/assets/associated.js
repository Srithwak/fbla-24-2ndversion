const { getObj, uploadJSON, getJSON, findElementById, getObjUser } = require('./helper/helper');
const path = require('path');
// const accountData = getJSON(path.join(__dirname, '../database/accounts.json'));

function displayAssociated(loggedInAccount = getJSON(path.join(__dirname, '../database/accounts.json')).find(account => account.id === parseInt(localStorage.getItem('id'), 10)) ) {
    // Retrieve the logged-in user's ID from localStorage
    const loggedInId = localStorage.getItem('id');
    // let accountData = getJSON(path.join(__dirname, '../database/accounts.json'));
    // const loggedInAccount = accountData.find(account => account.id === parseInt(loggedInId, 10));
    // console.log(loggedInAccount)
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
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = function () {
            row.remove(); // This removes the row from the table
        };
        row.insertCell(4).appendChild(deleteButton);
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
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = function () {
            row.remove(); // This removes the row from the table

        };
        row.insertCell(4).appendChild(deleteButton);
    });
}

function saveChanges() {
    const table = document.getElementById('gridTable');
    const rows = table.rows;
    let associatedData = [];
    let otherAssociatedData = [];
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].cells;
        if (!cells[0].textContent.includes('(account not listed)')) {
            associatedData.push({
                id: getObjUser(cells[0].textContent).id,
                money: cells[1].textContent,
                resources: cells[2].textContent,
                details: cells[3].textContent
            });
        } else {
            otherAssociatedData.push({
                username: cells[0].textContent.replace('(account not listed)', ''),
                money: cells[1].textContent,
                resources: cells[2].textContent,
                details: cells[3].textContent
            });
        }
    }
    let accountData = getJSON(path.join(__dirname, '../database/accounts.json'));
    for(let i = 0; i < accountData.length; i++) {
        if(accountData[i].id == localStorage.getItem('id')) {
            accountData[i].associated = associatedData;
            accountData[i].otherAssociated = otherAssociatedData;
            break;
        }
    }
    uploadJSON(path.join(__dirname, '../database/accounts.json'), accountData);
    console.log('Associated Data:', associatedData); // Log the current state of the 'associated' accounts
    console.log('Other Associated Data:', otherAssociatedData); // Log the current state of 'otherAssociated' accounts
}

function filter() {
    let usernameFilter = document.getElementById('usernameFilter');
    let moneyFilter = document.getElementById('moneyFilter');
    let resourcesFilter = document.getElementById('resourcesFilter');
    let notesFilter = document.getElementById('notesFilter');
    const radios = document.getElementsByName('fav_language');
    let selectedValue = '';
    for (let i = 0; i < radios.length; i++)
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    let accountData = getObj(localStorage.getItem('id'));
    let associated = getObj(localStorage.getItem('id')).associated;
    let otherAssociated = getObj(localStorage.getItem('id')).otherAssociated;
    // for(let i = 0; i < associated.length; i++) {

    // }
    // associated = [];
    // displayAssociated(accountData);
    console.log(associated);
    console.log(otherAssociated)
}

displayAssociated();
