import { addResult, saveResult,  clickRecord,  closeRecord } from "./results.js";
import { shuffle, PAIRS_FOR_WIN, compareUser } from "./utils.js";
import { setLocalStorage, getLocalStorage } from "./localStore.js";

let hasOpenCard = false;
let firstCard;
let secondCard;
let turns = 0;
let pairs = 0;
let hasTwoCard = false;
let users = [];
let quantityUsers;

const cards = document.querySelectorAll(".memory-card");
const popUp = document.querySelector(".pop-up");
const closeLink = document.querySelector(".popup-close");
const btnOk = document.querySelector(".btn-ok");

// addResult(pairs, turns);
shuffle();

cards.forEach((item) => {
  item.addEventListener("click", gameMemo);
});
closeLink.addEventListener("click", closePopup);
btnOk.addEventListener("click", closePopup);

window.addEventListener("beforeunload", () => {
  setLocalStorage(users);
});
window.addEventListener("load", () => {
  quantityUsers = getLocalStorage(users);
});

const recordTa = document.querySelector(".result__log");
const btnRecord = document.querySelector(".pop-record-close");

recordTa.addEventListener("click", () => clickRecord(users));
btnRecord.addEventListener("click", closeRecord);

const input = document.querySelector(".user-name");
//закрытие окна по кнопке enter
input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    closePopup();
  }
});

function gameMemo() {
  //не открывать более двух карт
  if (hasTwoCard) {
    return;
  }
  this.classList.add("flip");
  if (!hasOpenCard) {
    //открываем первую карточку
    firstCard = this;
    hasOpenCard = true;
    firstCard.style.pointerEvents = "none";
  } else {
    //открываем вторую карточку
    secondCard = this;
    secondCard.style.pointerEvents = "none";
    hasOpenCard = false;
    hasTwoCard = true;
    turns++;

    //совпадают
    if (firstCard.dataset.card === secondCard.dataset.card) {
      pairs++;
      hasTwoCard = false;
      if (pairs === PAIRS_FOR_WIN) {
        addResult(pairs, turns);
        popUp.classList.add("pop-activ");
        return;
      }
    } else {
      //не совпадают
      setTimeout(() => {
        firstCard.style.pointerEvents = "auto";
        secondCard.style.pointerEvents = "auto";
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        hasTwoCard = false;
      }, 1500);
    }
  }
  addResult(pairs, turns);
}

//закрываем окно с записью имени и перемешиваем карты обнуляем переменные
function closePopup() {
  popUp.classList.remove("pop-activ");
  saveResult(turns, users);
  turns = 0;
  pairs = 0;
  hasTwoCard = false;
  hasOpenCard = false;

  cards.forEach((item) => {
    item.style.pointerEvents = "auto";
    item.classList.remove("flip");
  });

  shuffle();
  addResult(pairs, turns);
}

