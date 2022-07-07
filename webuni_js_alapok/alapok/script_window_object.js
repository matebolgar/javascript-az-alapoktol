// var window = {
//     console: {
//         log: function (msg) {
//              // log msg
//         }
//     }
// }

// window = globális objektum - nem kell kiírni
//window.console.log('szia');
console.log('szia!');

/**
 *  - adott element JS reprezentációja
 *  - milyen esemény kapcsán akarsz reagálni: onclick
 *  - milyen kódot akarsz futtatni
 */

document.all[7].style.backgroundColor = "red";

document.all[7].onclick = function () {
    document.all[7].style.backgroundColor = "black";
}

console.dir(document.all[7]);
