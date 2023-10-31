const { getObj } = require('./helper/helper');

function required() {
    console.log(getObj(localStorage.getItem('id')));
}