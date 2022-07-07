"use strict";

// Drag and Drop megvalósítása
var state = {
  x: 150,
  y: 300,
  isDragged: false
}; // az oldal betöltésekor meg kell hívni a rendert hogy legyen a képernyőn vmi...

window.onload = render; // 1. Készíts renderelő függvényt, ami megjeleníti a dobozt a state-ből kiolvasott adatok alapján

function render() {
  var doboz = '<div class="box" style = "width: 200px; position: absolute;">' + '<div class="card-body">' + '<h5 class="card-title display-4"># húzd arréb</h5>' + '</div>' + '</div>';
  document.getElementById("drag-and-drop-app").innerHTML = doboz;
}