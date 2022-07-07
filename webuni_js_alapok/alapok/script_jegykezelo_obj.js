/**
 * Jegykezelő rendszer
 * 
 *  Input:
 *      Hány jegyet kér?
 *      Milyen típusú jegyet kér? (student | adult)
 * 
 *      A diákjegy ára: 300ft
 *      Nyugdíjs jegy : 280ft
 *      Felnőtt jegy : 350ft
 *      Tíznél több vásárlása esetán jár 10% kedvezmény
 * 
 */


var quantity = prompt("Jegyek száma:");
var type = prompt("Add meg a típust (adult / student / retired):");

var types = {
    adult: 350,
    student: 300,
    retired: 280
};

var price = types[type]; //type = "student"  ? 300 : 350;
var discount = quantity > 10 ? 0.9 : 1;

var total = quantity * price * discount;

alert("Fizetendő : " + total);


