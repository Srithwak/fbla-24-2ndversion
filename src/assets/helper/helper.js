const fs = require('fs'); //json
const path = require('path')



// HEADER STUFF
function toggleIcon() {
   const icon = document.querySelector('i');
   const state = icon.getAttribute('data-state');
   if (state === 'closed') {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      icon.setAttribute('data-state', 'open');
   } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      icon.setAttribute('data-state', 'closed');
   }
}

function toggleNav() {
   document.body.classList.toggle("nav-open");
   toggleIcon();
}






function getJSON(file) { //gets data from JSON file in a useable format
   return JSON.parse(fs.readFileSync(file));
}

function uploadJSON(file, data) { //overwrites JSON file and uploads with data
   fs.writeFileSync(file, JSON.stringify(data, null, 2), {
      encoding: 'utf8',
      flag: 'w'
   });
   console.log("Upload complete");
}

function sortByID(jsonFile = (path.join(__dirname, '../../database/accounts.json'))) { //sorts the json file based on id
   return getJSON(jsonFile).sort((a, b) => a.id - b.id);
}

function findNextID(jsonFile = (path.join(__dirname, '../../database/accounts.json'))) { //finds the next available ID to use
   let jsonData;
   if (Array.isArray(jsonFile))
      jsonData = jsonFile;
   else
      jsonData = sortByID(jsonFile);
   for (let i = 0; i < jsonData.length; i++)
      if (jsonData[i].id != i)
         return i;
   return jsonData.length;
}

function makePartnerAccount(username, password, email) { //not tested
   let account = {
      id: findNextID(path.join(__dirname, '../../database/accounts.json')),
      username: username,
      password: password,
      description: '',
      email: email,
      phone: 0,
      website: "",
      socialMedia: [],
      messages: [],
      visibility: "public",
      log: [],
      hashKey: ""
   }
   let arr = getJSON(path.join(__dirname, '../../database/accounts.json'));
   arr.push(account);
   uploadJSON(path.join(__dirname, '../../database/accounts.json'), arr);
   console.log(account);
   return account;
}

function makeSchoolAccount(username, password, email) { //not tested
   let account = {
      id: findNextID(path.join(__dirname, '../../database/accounts.json')),
      username: username,
      password: password,
      email: email,
      phone: 0,
      website: '',
      description: "",
      messages: [],
      socialMedia: [],
      associated: [],
      otherAssociated: [],
      log: [],
      hashKey: ""
   }
   let arr = getJSON(path.join(__dirname, '../../database/accounts.json'));
   arr.push((account));
   uploadJSON(path.join(__dirname, '../../database/accounts.json'), arr);
   return account;
}

function searchAttribute(attribute, data) {
   if (data === undefined) data = getJSON(path.join(__dirname, '../../database/accounts.json'))
   return data.filter(obj => obj.hasOwnProperty(attribute)).map(obj => obj[attribute]);
}

function findElementById(id, file = getJSON(path.join(__dirname, '../../database/accounts.json'))) {
   for (let i = 0; i < file.length; i++)
      if (file[i].id == id)
         return i;
   return -1;
}

function getObj(id) {
   return getJSON(path.join(__dirname, '../../database/accounts.json')).find(obj => obj.id == id);
}

function getObjUser(username) {
   return getJSON(path.join(__dirname, '../../database/accounts.json')).find(obj => obj.username == username);
}


function errorPopup() { //error popup function

}

module.exports = {
   fs, getJSON, uploadJSON, sortByID, findNextID, makePartnerAccount, makeSchoolAccount, searchAttribute, getObj, getObjUser, findElementById, errorPopup
};

