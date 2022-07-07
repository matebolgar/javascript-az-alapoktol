"use strict";

/*
1. doboz:
Kattintásra adjunk hozzá egy "blur" nevű class attribútumot, majd újabb kattintásra vegyük
le róla azt.
*/

/*
   - element JS repr. : document.getElementById('element-one')
   - esemény kiválasztása : onclick
   - funkcionalitás: function () {...}
 */
// state létrehozása:
var isBlurred = false; // action (esemény)

document.getElementById('element-one').onclick = function () {
  // state változás
  isBlurred = !isBlurred; // renderelés

  if (isBlurred) {
    document.getElementById('element-one').classList.add("blur");
  } else {
    document.getElementById('element-one').classList.remove("blur");
  }
};
/*
2. doboz:
Ha az egérrel fölé megyünk változzon meg a háttérszíne pirosra, ha levesszük róla az egeret
változzon vissza az eredeti színére.
*/
// state


var isHoveredOver = false; // action

document.getElementById("element-two").onmouseover = function () {
  isHoveredOver = true;
  renderSecondBox();
}; // action


document.getElementById("element-two").onmouseout = function () {
  isHoveredOver = false;
  renderSecondBox();
};

function renderSecondBox() {
  if (isHoveredOver) {
    document.getElementById("element-two").style.backgroundColor = "red";
  } else {
    document.getElementById("element-two").style.backgroundColor = "";
  }
}
/*
3. doboz:
Dupla kattintással sorsoljon egy számot 1 és 20 között és módosítsa a kapott számmal a doboz tartalmát. 
*/


document.getElementById("element-three").ondblclick = function () {
  // véletlenszám 1 és 20 között:
  var iRand = Math.floor(Math.random() * 19) + 1;
  document.getElementById("element-three").firstElementChild.innerHTML = iRand;
};
/*
4. doboz:
Kattintásra tűnjön el, majd egy 1 másodperces várakozás után ismét jelenjen meg.
*/


document.getElementById("element-four").onclick = function () {
  // elrejtés (lehetőleg classokat kell hozzáadni/eltávolítani mint a style-al játszani!!!)
  document.getElementById("element-four").classList.add("hidden"); // timer indítása és a box megjelenítése 1 sec után

  setTimeout(function () {
    document.getElementById("element-four").classList.remove("hidden");
  }, 1000);
};
/*
5. doboz:
Kattintásra alakítsa kör alakúra az összes dobozt.
saját szopatásra: kattintásokkor kerekítsen majd újabb kattra állítson vissza
state gyakorlásra...  :D 
*/
// összes shape-et visszaadja
//console.log(document.querySelectorAll(".container .shape"));
// összes shape


var arrBoxes = document.querySelector(".container").children; // boxok állapota

var bBoxRoundState = false;

document.getElementById("element-five").onclick = function () {
  // boxok állapotának átállítása
  bBoxRoundState = !bBoxRoundState; // új állapot renderelése (true = kör, false = kocka)

  changeBoxesToCirleRender(bBoxRoundState);
};

function changeBoxesToCirleRender(bState) {
  // összes box kör lesz
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arrBoxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var box = _step.value;
      bState ? box.classList.add("box5style") : box.classList.remove("box5style");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
/*
6. doboz:
Form submit eseményre módosítsuk a doboz tartalmát az input mezőbe írt értékkel
*/


document.getElementById("box-6").onsubmit = function (event) {
  // megtiltjuk az alapértelmezett form elküldést
  event.preventDefault();
  console.log(event.target); // target -mutat arra az elemre amin az esemény bekövetkezett (most itt a form-ra!)

  console.log(event.target.elements); // összes form elemet tartalmazza

  console.log(event.target.elements.boxNumber.value); // "boxNumber" name-el ellátott input beírt értékét adja vissza

  console.log("Form elemek száma: " + event.target.elements.length);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = event.target.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var frmctrl = _step2.value;
      console.log("Típus: " + frmctrl.type);
    } // feladat megoldása tehát

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  document.getElementById("element-six").firstElementChild.innerHTML = event.target.elements.boxNumber.value;
};
/*
7. doboz:
Keypress eseményre írjuk be a dobozba az adott karaktert, amit leütöttek
*/


document.getElementById("box7-input").onkeypress = function (event) {
  document.getElementById("element-seven").firstElementChild.innerHTML = event.key;
};
/*
8. doboz:
Egérmozdítás eseményre írjuk be az egér pozíciójának x és y koordinátáját, 
a következő séma szerint: "X: {x-koordináta}, Y: {y-koordináta}"
*/


document.onmousemove = function (event) {
  // console.log(event);
  // var sCoordDatas = "X: " + event.offsetX + ", Y: " + event.offsetY;
  var sCoordDatas = "X: ".concat(event.offsetX, ", Y: ").concat(event.offsetY);
  document.getElementById("element-eight").firstElementChild.innerHTML = sCoordDatas;
};
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


var state = 9;

document.getElementById("box-9").onsubmit = function (event) {
  event.preventDefault();
  var operand = Number(event.target.elements.operand.value);
  var operator = event.target.elements.operator.value; // console.log(operand + " | " + operator);

  switch (operator) {
    case "mult":
      state = state * operand;
      break;

    case "div":
      state = state / operand;
      break;

    case "mult":
      state = state * operand;
      break;

    case "add":
      state = state + operand;
      break;

    case "sub":
      state = state - operand;
      break;

    default:
      break;
  }

  document.getElementById("element-nine").firstElementChild.innerHTML = state;
};