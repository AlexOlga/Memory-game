import {compareUser} from './utils.js';

//сохраняем переменные из local store
export function setLocalStorage(users) {
    users.sort(compareUser);
    if (users.length > 10) {
      users = users.slice(0, 10);
    }
    localStorage.setItem("quantityUsers", users.length);
  
    users.forEach((item, index) => {
      localStorage.setItem(
        `user_${index}`,
        `${item.name}-separator-${item.turns}`
      );
    });
  }
  
export function getLocalStorage(users) {
    let quantityUsers;
    if (localStorage.getItem("quantityUsers")) {
      quantityUsers = +localStorage.getItem("quantityUsers");
    }
    for (let i = 0; i < quantityUsers; i++) {
      users[i] = {};
      if (localStorage.getItem(`user_${i}`)) {
        let s;
        s = localStorage.getItem(`user_${i}`);
        let arr = s.split("-separator-");
        users[i].name = arr[0];
        users[i].turns = Number(arr[1]);
      }
    }
    return  quantityUsers;
  }