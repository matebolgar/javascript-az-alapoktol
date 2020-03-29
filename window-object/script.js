// var window = {
//   console: {
//     log: function (msg) {
//         // logs msg
//     }
//   }
// };

// globális objektum
window.console.log("szia");
/*
  - adott element JS reprezentációja: document.all[5]
  - milyen esemény kapcsán akarsz reagálni: onclick
  - milyen kódot akarsz futtatni
*/


document.all[5].onclick = function() {
  document.all[5].style.backgroundColor = "red";
  console.log("ok");
};

console.dir(document.all[5]);
