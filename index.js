const cards=document.querySelectorAll('.memory-card');
let hasOpenCard=false;
let firstCard;
let secondCard;
let turns=0;
let pairs=0;
let hasTwoCard = false;
let users=[];
let quantityUsers;


function gameMemo (){
  //не открывать более двух карт
  if ( hasTwoCard) {return  };

    this.classList.add('flip'); 
  if (!hasOpenCard)  {
      //открываем первую карточку
    firstCard=this;
    hasOpenCard=true;
    firstCard.style.pointerEvents='none'
  
  } else {  
    //открываем вторую карточку 
    secondCard=this;
    secondCard.style.pointerEvents='none'
    hasOpenCard=false;
    hasTwoCard = true;
    turns++;
   
    //совпадают
    if (firstCard.dataset.card ===secondCard.dataset.card){
        pairs++;    
        hasTwoCard=false;
        if (pairs===8) {
          addResult();
          popUp.classList.add('pop-activ');
       return
        };
    } else { 
      //не совпадают
        setTimeout(() => {
           firstCard.style.pointerEvents='auto';
           secondCard.style.pointerEvents='auto';
           firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            hasTwoCard=false;
            }, 1500);
                       
    }
   
  }
  addResult();

   };

   const pairsText=document.querySelector('.paris');
   const turnsText=document.querySelectorAll('.turns');


   function addResult(){    
    pairsText.textContent = pairs;
    turnsText.forEach((item)=>{item.textContent = turns});
   };

//перемешиваем карты
    function shuffle() {
      cards.forEach(card => {
          let ramdomPos = Math.floor(Math.random() * 16);
           card.style.order = ramdomPos;
         });
    };

      //закрываем окно с записью имени и перемешиваем карты обнуляем переменные
    function closePopup (){
      popUp.classList.remove('pop-activ');
      saveResult ();
      turns=0;
      pairs=0;
      hasTwoCard = false;
      hasOpenCard=false;

      cards.forEach((item)=>{
        item.style.pointerEvents='auto';
        item. classList.remove('flip');});

     shuffle();
     addResult();
    
    }

    addResult();
    shuffle();

cards.forEach((item)=>{item.addEventListener('click', gameMemo)});
const popUp=document.querySelector('.pop-up');
const  closeLink=document.querySelector('.popup-close');
closeLink.addEventListener('click', closePopup);

const btnOk=document.querySelector('.btn-ok');
const nameUser=document.querySelector('.user-name');

function saveResult (){
  let newUser={};
  if (nameUser.value=='') {
    newUser.name='I am very humble'
  } else {
    newUser.name= nameUser.value;
  };  
  newUser.turns=turns;
  users.push(newUser);
 
};
 btnOk.addEventListener('click', closePopup);

//сохраняем переменные из local store
 function setLocalStorage() {
    users.sort(compareUser);
    if (users.length>10 ) {
     users=users.slice(0,10);
       }
     localStorage.setItem('quantityUsers', users.length);
 
     users.forEach((item,index)=>{
      localStorage.setItem(`user_${index}`, `${item.name}-separator-${item.turns}`)
         });
}

window.addEventListener('beforeunload', setLocalStorage);

// достаем переменные из local store
function getLocalStorage() {
  
  if (localStorage.getItem('quantityUsers')) {
    quantityUsers= + localStorage.getItem('quantityUsers');
      }
        for (let i=0; i<quantityUsers;i++){
        users[i]={};
       if (localStorage.getItem(`user_${i}`)) {
         let s;
          s= localStorage.getItem(`user_${i}`);
                let arr=s.split('-separator-');
             users[i].name=arr[0];
          users[i].turns=Number(arr[1]);
             }

            }     
     
};
window.addEventListener('load', getLocalStorage);

//правила сортировки массива
function compareUser(a, b) {
  if (a.turns > b.turns) return 1; // если первое значение больше второго
  if (a.turns == b.turns) return 0; // если равны
  if (a.turns < b.turns) return -1; // если первое значение меньше второго
};

//составляем таблицу рекордов
function addRow(tableID) { 
  users.sort(compareUser);
  if (users.length>10 ) {
   users=users.slice(0,10);
    }
  users.forEach((item,i)=>{
  var newRow = tableRef.insertRow(-1);
  
  var newCell = newRow.insertCell(-1);
  var newText = document.createTextNode(i+1);
  newCell.appendChild(newText);
  newCell = newRow.insertCell(-1);
  newText = document.createTextNode(item.name);
  newCell.appendChild(newText);
 newCell = newRow.insertCell(-1);
 newText = document.createTextNode(item.turns);
  newCell.appendChild(newText);
});
  
};


function deletRow(){
  let n= tableRef.rows.length-1;
   for (let i=n; i>0;i--){
    tableRef.deleteRow(i);
  }
   
}


const recordTa=document.querySelector(".record");
const popRecord=document.querySelector(".pop-record");
const btnRecord=document.querySelector(".pop-record-close");
let tableRef = document.getElementById('tableRecord');

function clickRecord(){
  deletRow();
  addRow('tableRecord'); 
  popRecord.classList.add('pop-activ');  
}

function closeRecord(){
  popRecord.classList.remove('pop-activ');
}
recordTa.addEventListener('click', clickRecord);
btnRecord.addEventListener('click', closeRecord );
const input=document.querySelector(".user-name");
//закрытие окна по кнопке enter
input.addEventListener('keydown', (e)=> {if (e.keyCode === 13) {closePopup()}});

console.log('Выполнены все требования')
