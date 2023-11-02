const { getObj, uploadJSON, getJSON } = require('./helper/helper');
const path = require('path');

function onLoadRun1() {
  let account = getObj(localStorage.getItem('id'));
  document.querySelector('.username').value = account.username;
  document.querySelector('.password').value = account.password;
  document.querySelector('.email').value = account.email;
  document.querySelector('.description').value = account.description;
  document.querySelector('.website').value = account.website;
  document.querySelector('.phone').value = account.phone;
  for (let i of account.socialMedia)
    addSocialMedia(i);
}

function addSocialMedia(value = '') {
  const socialMediaContainer = document.querySelector('.socialMediaContainer');
  const socialMediaInputs = document.createElement('div');
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.className = 'socialMedia';
  inputElement.value = value;
  socialMediaInputs.appendChild(inputElement);
  socialMediaInputs.appendChild(document.createElement('br'));
  socialMediaInputs.appendChild(document.createElement('br'));
  socialMediaContainer.appendChild(socialMediaInputs);
}

function editAccount() {
  const account = {
    id: parseInt(localStorage.getItem('id')),
    username: document.querySelector('.username').value,
    password: document.querySelector('.password').value,
    email: document.querySelector('.email').value,
    description: document.querySelector('.description').value,
    website: document.querySelector('.website').value,
    phone: document.querySelector('.phone').value,
    socialMedia: []
  };
  const socialMediaInputs = document.querySelectorAll('.socialMedia');
  socialMediaInputs.forEach(input => {
    if(input.value != '')
      account.socialMedia.push(input.value);
  });

  let data = getJSON(path.join(__dirname, '../database/accounts.json'));
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == localStorage.getItem('id')) {
      account.messages = data[i].messages;
      account.associated = data[i].associated;
      account.hashKey = data[i].hashKey;
      data[i] = account;
    }
  }
  uploadJSON(path.join(__dirname, '../database/accounts.json'), data);
}
