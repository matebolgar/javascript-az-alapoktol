"use strict";

// Drag and Drop megvalósítása
//a kiinduló állapotot is dinamikusan állítjuk elő. Így az első kirajzolás nem egy fix helyen történik, hanem az appunk konténer elementjének kezdeténél.
var state = {
  x: undefined,
  y: undefined,
  isDragged: false
};
var container = document.getElementById("drag-and-drop-app");
state.x = container.offsetLeft;
state.y = container.offsetTop; // az oldal betöltésekor meg kell hívni a rendert hogy legyen a képernyőn vmi...

window.onload = render; // 1. Készíts renderelő függvényt, ami megjeleníti a dobozt a state-ből kiolvasott adatok alapján
// 2. A dobozt úgy rajzold ki, hogy az element-nek a position style attribútuma "absolute", a 
//    left és a top attribútuma pedig a state-ből származó x és y érték

function render() {
  var doboz = "\n    <div\n        onmousedown=\"dobozDragStart()\" \n        onmouseup=\"dobozDragEnd()\" \n        onmousemove=\"dobozMouseMove(window.event)\" \n        style=\"width: 150px; height: 150px; position: absolute; left: ".concat(state.x, "px; top: ").concat(state.y, "px;\"\n        class=\"box ").concat(state.isDragged ? "grabbed" : "not-grabbed", "\">\n        <div class=\"card-body\">\n            <h1 class=\"card-title display-4\"># h\xFAzd arr\xE9bb</h1>\n        </div>\n    </div>\n  ");
  document.getElementById("drag-and-drop-app").innerHTML = doboz;
} // 3. A doboz mousedown eseményre reagálva módosítsd a state isDragged értékét true-ra


function dobozDragStart() {
  state.isDragged = true;
  render();
} // 4. A doboz mouseup eseményre reagálva módosítsd a state isDragged értékét false-ra


function dobozDragEnd() {
  state.isDragged = false;
  render();
}
/* 5. A doboz mousemove eseménykor vizsgáld meg, hogy a state.isDragged értéke true-e
Amennyiben igen, írd be a state x és y kulcsa alá az egér aktuális x,y pozícióját */


function dobozMouseMove(event) {
  if (state.isDragged) {
    //meg kell tudnunk a doboz element dimenzióit.
    //A doboz elementhez, az event target-en keresztül juthatunk hozzá.
    //A "closest" függvény azt csinálja, hogy elkezd felfelé lépdelni az element
    //hierarchiában és közben azt az elementet keresi, ami egyezik a bepasszolt
    //selector értékével.Jelen esetben addig lépdel, amíg bele nem ütközik a box
    //classú elementbe és ezt az elementet adja vissza találatként.
    //A szélességet és a magasságot a box.offsetWidth és a box.offsetHeight kulcsok alól tudjuk kinyerni.
    //Ezek mellett azt is hozzászámolhatjuk, hogy az oldal mennyire van legörgetve. 
    //Így az érték pontos marad, görgetés esetén is.
    var box = event.target.closest(".box");
    state.x = document.documentElement.scrollLeft + event.clientX - box.offsetWidth / 2;
    state.y = document.documentElement.scrollTop + event.clientY - box.offsetHeight / 2;
    render();
  }
}