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
  document.querySelector('.visibility').value = account.visibility;
  const socialMediaContainer = document.querySelector('.socialMediaContainer');
  socialMediaContainer.innerHTML = '';
  const label = document.createElement('label');
  label.textContent = 'Social Media:';
  socialMediaContainer.appendChild(label);
  const addButton = document.createElement('input');
  addButton.type = 'button';
  addButton.value = 'Add Social Media';
  addButton.addEventListener('click', addSocialMedia);
  socialMediaContainer.appendChild(addButton);
  for (let i of account.socialMedia)
    addSocialMedia(i);
}

function addSocialMedia(value = '') {
  if (value == '[object PointerEvent]')
    value = '';
  const socialMediaContainer = document.querySelector('.socialMediaContainer');
  for (let i = 0; i < document.querySelectorAll('.socialMedia').length; i++)
    if (document.querySelectorAll('.socialMedia')[i].value == '')
      return;
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
  let account = {
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
    if (input.value != '')
      account.socialMedia.push(input.value);
  });
  let data = getJSON(path.join(__dirname, '../database/accounts.json'));
  for (let i = 0; i < data.length; i++) {
    account.log = data[i].log;
    account.messages = data[i].messages;
    account.hashKey = data[i].hashKey;
    account.log = log;
  }
  if (data[i].visibility != undefined)
    account.visibility = document.querySelector('.visibility').value;
  data[i] = account;
  uploadJSON(path.join(__dirname, '../database/accounts.json'), data);
}
