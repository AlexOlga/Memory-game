
export const PAIRS_FOR_WIN = 8;
//перемешиваем карты
export function shuffle() {
    const cards = document.querySelectorAll(".memory-card");
    cards.forEach((card) => {
      let ramdomPos = Math.floor(Math.random() * PAIRS_FOR_WIN*2);
      card.style.order = ramdomPos;
    });
  }
  
  //правила сортировки массива
export function compareUser(a, b) {
    if (a.turns > b.turns) return 1; // если первое значение больше второго
    if (a.turns == b.turns) return 0; // если равны
    if (a.turns < b.turns) return -1; // если первое значение меньше второго
  }