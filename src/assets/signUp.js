const { makePartnerAccount, makeSchoolAccount, searchAttribute } = require('./helper/helper');

function toRun() {
   // const username = document.querySelector(".username").value;
   // const password1 = document.querySelector(".password1").value;
   // const password2 = document.querySelector(".password2").value;
   // const email = document.querySelector(".email").value;
   const username = 'srithwak';
   const password1 = 'Popop12345*';
   const password2 = 'Popop12345*';
   const email = 'srithwak@gmail.com';
   if (searchAttribute('username').includes(username)) return console.log("Username already exists"); //errorPopup
   else if (searchAttribute('email').includes(email)) return console.log("Email already exists"); //errorPopup
   else if (password1 != password2) return console.log("Passwords do not match"); //errorPopup
   else if (!(username.match(/^[a-zA-Z0-9]{4,}$/))) return console.log('Invalid username');
   else if (!(password2.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))) return console.log('Invlaid password');
   else if (!(email.match(/^[a-zA-Z0-9.]+@(gmail|yahoo|outlook|hotmail)\.com$/))) return console.log('MAKE AN ACCOUNT U SICK FUCK');

   let partner = false, school = false;
   if (document.querySelector(".partner").checked)
      partner = true;
   else if (document.querySelector(".school").checked)
      school = true;
   else {
      console.log("No account type selected"); //errorPopup
      return false;
   }
   if (partner)
      makePartnerAccount(username, password1, email);
   else if (school)
      makeSchoolAccount(username, password1, email);
   // location.href = 'login.html';
}
