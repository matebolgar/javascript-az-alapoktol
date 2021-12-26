/*
1. doboz:
Kattintásra adjunk hozzá egy "blur" nevű class attribútumot, majd újabb kattintásra vegyük
le róla azt.
let blure = false;
- element JS reprezentációja   document.getElementById("element-one")
- esemény leirása   onclick 
- funkció kiválasztása   function(){....}
keresés: how to attribute create class in JS
*/
let isBlure = false;

document.getElementById("element-one").onclick= function(){
isBlure =!isBlure;
// console.log(isBlure)
if(isBlure){
  document.getElementById("element-one").classList.add("blur");
}else{
  document.getElementById("element-one").classList.remove("blur");
}
 
 
}
  


/*
2. doboz:
Ha az egérrel fölé megyünk változzon meg a háttérszíne pirosra, ha levesszük róla az egeret
változzon vissza az eredeti színére.
*/

let isMouseOver = false;

document.getElementById("element-two").onmouseover=function(){
isMouseOver=true;
renderSecondDb()
}
document.getElementById("element-two").onmouseout=function(){
  isMouseOver = false;
  renderSecondDb()

}

function renderSecondDb(){
  if(isMouseOver){
    document.getElementById("element-two").style.backgroundColor="red";
  }else{
    document.getElementById("element-two").style.backgroundColor="";
  }
}


/*
3. doboz:
Dupla kattintással sorsoljon egy számot 1 és 20 között és módosítsa a kapott számmal a doboz tartalmát. 
*/

document.getElementById("element-three").ondblclick=function(){

 document.getElementById("element-three").firstElementChild.innerHTML= getRandomArbitrary(1,20)
//  document.getElementById("element-three").style.color="white";

;  
}
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
console.log(getRandomArbitrary(1,20))

/*
4. doboz:
Kattintásra tűnjön el, majd egy 1 másodperces várakozás után ismét jelenjen meg.
*/
document.getElementById("element-four").onclick=function(){
  document.getElementById("element-four").classList.add('hidden')
  setTimeout(function(){
    document.getElementById("element-four").classList.remove('hidden')
    document.getElementById("element-four").style.color="yellow"

  },1000);
}


/*
5. doboz:
Kattintásra alakítsa kör alakúra az összes dobozt.


*/

//document.querySelector('.container').children
//document.querySelectorAll('.shape')

let boxes = document.getElementsByClassName("shape")
document.getElementById("element-five").onclick=function(event){
for( let box of boxes){

 
 box.style.borderRadius="50%"

}

}
document.getElementById("element-five").ondblclick=function(event){
for( let box of boxes){

 
 box.style.borderRadius="0"

}

}
/*
6. doboz:
Form submit eseményre módosítsuk a doboz tartalmát az input mezőbe írt értékkel
*/
document.getElementById("box-6").onsubmit=function(event){
  event.preventDefault();
  document.getElementById("element-six").firstElementChild.innerHTML=event.target.elements.boxNumber.value
// document.getElementById("element-six").style.backgroundColor="pink"
 // console.log(event.target.elements.boxNumber.value)
}

/*
7. doboz:
Keypress eseményre írjuk be a dobozba az adott karaktert, amit leütöttek
*/

document.getElementById("box7-input").onkeydown  =  function(event){
  
  document.getElementById("element-seven").firstElementChild.innerHTML=event.key;
}


/*
8. doboz:
Egérmozdítás eseményre írjuk be az egér pozíciójának x és y koordinátáját, 
a következő séma szerint: "X: {x-koordináta}, Y: {y-koordináta}"
*/
document.getElementById("element-eight").onmousemove = function(event){
  let x = event.clientX;
  let y = event.clientY;
  let coords = "X coords: " + x + ", Y coords: " + y;
  console.log(coords)
  document.getElementById("element-eight").innerHTML = coords;
}


/*
9. doboz:
Submit eseményre módosítsuk a doboz tartalmát azzal az értékkel ami úgy áll elő, 
hogy végrehajtjuk a select inputban kiválasztott operációt,
a state-en és number inputba beírt értéken.

Az előállt végeredményt tároljuk el új state-ként!

Pl:
  Number input mezőbe írt érték: 5
  Select inputban kiválasztott érték: "mult"
  Aktuális state: 9

  Operáció: 9 * 5
  
  Dobozba és state-be beírandó érték: 45
*/
let state = 9;

document.getElementById("box-9").onsubmit = function(event) {
  event.preventDefault();
  let operand = Number(event.target.elements.operand.value);
  let operator = event.target.elements.operator.value;

  // console.log(operand);
  // console.log(operator);

  switch (operator) {
    case "mult":
      state = state * operand;
      break;
    case "div":
      state = state / operand;
      break;
    case "add":
      state = state + operand;
      break;
    case "sub":
      state = state - operand;
      break;
  }

  document.getElementById("element-nine").firstElementChild.innerHTML = state;
  console.log(state)
};
  
 
