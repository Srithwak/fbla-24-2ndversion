const { getObj, uploadJSON, getJSON, findElementById } = require('./helper/helper');
const path = require('path');

// Function to render the table with associated data
function renderTable(associatedData = getObj(localStorage.getItem('id'))) {

    const associatedTable = document.createElement('table');
    associatedTable.style.borderCollapse = 'collapse';
    associatedTable.style.width = '100%';

    const tableHeader = associatedTable.createTHead();
    const headerRow = tableHeader.insertRow();
    ['Associated Name', 'Money', 'Resources', 'Notes'].forEach(headerText => {
        const th = document.createElement('th');
        th.style.border = '1px solid #dddddd';
        th.style.textAlign = 'left';
        th.style.padding = '8px';
        th.style.backgroundColor = '#f2f2f2';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    if (associatedData.associated && associatedData.associated.length > 0) {
        associatedData.associated.forEach(assoc => {
            const row = associatedTable.insertRow();
            let money = assoc.money !== null ? assoc.money : 'N/A';
            let resources = assoc.resources ? assoc.resources : 'N/A';
            let details = assoc.details !== '' ? assoc.details : 'N/A';

            row.innerHTML = `
                <td>${getObj(assoc.id).username}</td>
                <td contenteditable="true">${money}</td>
                <td contenteditable="true">${resources}</td>
                <td contenteditable="true">${details}</td>
            `;
        });
    }

    if (associatedData.otherAssociated && associatedData.otherAssociated.length > 0) {
        associatedData.otherAssociated.forEach(assoc => {
            const row = associatedTable.insertRow();
            let money = assoc.money !== null ? assoc.money : 'N/A';
            let resources = assoc.resources ? assoc.resources : 'N/A';
            let details = assoc.details !== '' ? assoc.details : 'N/A';

            row.innerHTML = `
                <td>${assoc.name} (Account not listed)</td>
                <td contenteditable="true">${money}</td>
                <td contenteditable="true">${resources}</td>
                <td contenteditable="true">${details}</td>
            `;
        });
    }

    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // Clear previous table content
    tableContainer.appendChild(associatedTable);
}

// Save changes function
function saveChanges(upload = true, allAccounts = getJSON(path.join(__dirname, '../database/accounts.json'))) {
    // Get all cells with the contenteditable attribute set to true
    const editableCells = document.querySelectorAll('td[contenteditable="true"]');
    const data = [];

    // Iterate through each cell and extract its content
    editableCells.forEach(cell => {
        const cellContent = cell.textContent.trim();
        data.push(cellContent);
    });

    let account = getObj(localStorage.getItem('id'));
    let pointer = 0;
    for (let i = 0; i < account.associated.length; i++) {
        account.associated[i].money = parseInt(data[pointer]);
        pointer++;
        account.associated[i].resources = data[pointer];
        pointer++;
        account.associated[i].details = data[pointer];
        pointer++;
    }
    for (let i = 0; i < account.otherAssociated.length; i++) {
        account.otherAssociated[i].money = parseInt(data[pointer]);
        pointer++;
        account.otherAssociated[i].resources = data[pointer];
        pointer++;
        account.otherAssociated[i].details = data[pointer];
        pointer++;
    }
    for (let i = 0; i < allAccounts.length; i++) {
        if (allAccounts[i].id == localStorage.getItem('id'))
            allAccounts.splice(i, 1, account);
    }
    if (upload){
        uploadJSON(path.join(__dirname, '../database/accounts.json'), allAccounts);
    }
    return allAccounts;
}

function filterTable() { //doesnt work
    let allAccounts = saveChanges(false); // Assuming saveChanges returns the data
    let elem = findElementById(localStorage.getItem('id'));
    const usernameFilter = document.getElementById('usernameFilter').value.toLowerCase();
    const moneyFilter = parseInt(document.getElementById('moneyFilterValue').value);
    const moneyOptionFilter = document.getElementById('moneyFilterOption').value
    const resourceFilter = document.getElementById('resourcesFilter').value.toLowerCase();
    for(let i = 0; i < allAccounts[elem].associated.length; i++)
        if(!getObj(allAccounts[elem].associated[i].id).username.includes(usernameFilter)){
            allAccounts[elem].associated.splice(i, 1);
            i--;
        } 
    
    renderTable(allAccounts[elem]);
    console.log(allAccounts[elem].associated);
}

// Call the function to render the table
renderTable();
