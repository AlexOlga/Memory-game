import {compareUser} from './utils.js';
export function addResult(pairs, turns) {
  const pairsText = document.querySelector(".paris");
  const turnsText = document.querySelectorAll(".turns");
  pairsText.textContent = pairs;
  turnsText.forEach((item) => {
    item.textContent = turns;
  });
}

export function saveResult(turns, users) {
  const nameUser = document.querySelector(".user-name");
  let newUser = {};
  if (nameUser.value == "") {
    newUser.name = "I am very humble";
  } else {
    newUser.name = nameUser.value;
  }
  newUser.turns = turns;
  users.push(newUser);
}

const tableRef = document.getElementById("tableRecord");
const popRecord = document.querySelector(".pop-record");

export function clickRecord(users) {
  deletRow();
  addRow("tableRecord", users);
  popRecord.classList.add("pop-activ");
}

export function closeRecord() {
  popRecord.classList.remove("pop-activ");
}

//составляем таблицу рекордов
function addRow(tableID, users) {
  users.sort(compareUser);
  if (users.length > 10) {
    users = users.slice(0, 10);
  }
  users.forEach((item, i) => {
    var newRow = tableRef.insertRow(-1);

    var newCell = newRow.insertCell(-1);
    var newText = document.createTextNode(i + 1);
    newCell.appendChild(newText);
    newCell = newRow.insertCell(-1);
    newText = document.createTextNode(item.name);
    newCell.appendChild(newText);
    newCell = newRow.insertCell(-1);
    newText = document.createTextNode(item.turns);
    newCell.appendChild(newText);
  });
}

function deletRow() {
  let n = tableRef.rows.length - 1;
  for (let i = n; i > 0; i--) {
    tableRef.deleteRow(i);
  }
}
