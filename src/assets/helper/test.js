const path = require('path');
const fs = require('fs');

function getJSON(file) { //gets data from JSON file in a useable format
    return JSON.parse(fs.readFileSync(file));
 }
console.log(getJSON(path.join(__dirname, '../../database/accounts.json')));