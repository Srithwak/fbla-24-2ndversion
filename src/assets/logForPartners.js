const { getObj } = require('./helper/helper');
const path = require('path');

/*
all the changes that can be made:
    partner added
    partner removed
    change in resources or money given
*/

/*
Partner added: 
    {
        type: "add",
        schoolId: 0,
        money: 0,
        resources: ""
    }
*/

/*
Partner removed: 
    {
        type: "remove",
        schoolId: 0
    }
*/

/*
Change request of something: 
    {
        type: "changeReq",
        schoolId: 0,
        money: 0,
        resources: ""
    }
*/

/*
Change approval:
    {
        type: "changeApp",
        schoolId: 0,
        money: 0,
        resources: ""
    }
*/

/*
Partner request: 
    {
        type: "request",
        schoolId: 0,
        notes: ""
    }
*/

function addItem(content) {
    var container = document.getElementById("lineContainer");
    var item = document.createElement("div");
    item.className = "item";
    // item.textContent = "Item " + (container.children.length + 1);
    item.textContent = content;
    container.appendChild(item);
}

function makeLogTable() { //not tested
    let log = getObj(localStorage.getItem('id')).log;
    for (let entry of log)
        if (entry.type === "request")
            addItem(`School ${getObj(entry.schoolId).username} has requested to partner up, saying: "${entry.notes}"`);
        else if (entry.type === "add")
            addItem(`You added School ${getObj(entry.schoolId).username}. Money: ${entry.money}, Resources: ${entry.resources}`);
        else if (entry.type === "remove")
            addItem(`School ${getObj(entry.schoolId).username} removed you`);
        else if (entry.type === "changeReq")
            addItem(`Change request for School ${getObj(entry.schoolId).username}. Money: ${entry.money}, Resources: ${entry.resources}`);
        else if (entry.type === "changeApp")
            addItem(`Change approved for School ${getObj(entry.schoolId).username}. Money: ${entry.money}, Resources: ${entry.resources}`);
}

makeLogTable();