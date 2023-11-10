const { getJSON } = require('./helper/helper');
const path = require('path');
function login() {
   const username = document.querySelector('.username').value;
   const password = document.querySelector('.password').value;
   if (username == '') {
      console.log('username is blank'); //errorPopup
      return;
   }
   else if (password == '') {
      console.log('password is blank'); //errorPopup
      return;
   }
   let accounts = getJSON(path.join(__dirname, '../database/accounts.json'));
   for (i of accounts)
      if (i.username == username && i.password == password) {
         localStorage.setItem("id", JSON.stringify(i.id)); //sets the user object to localStorage
         location.href = 'associated.html';
         return;
      }
   console.log('Incorrect username or password'); //errorPopup
   return;
}