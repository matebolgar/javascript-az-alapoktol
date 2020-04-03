/*
* Készíts egy új változót "osszeg" néven és assignment operátor segítségével kösd be alá értékként az elsoSzam és masodikSzam
* változók alatt lévő értékek összegét. Logold ki az osszeg változó értékét.
*/

var elsoSzam = 12;

var masodikSzam = 4;

var osszeg = elsoSzam + masodikSzam;
console.log(osszeg);

/*
* Konkatenáld hozzá a " felhasználó!" stringet az uzenet változóban eltárolt értékhez.
*/

var uzenet = "Szia" + " felhasználó!";

/*
* Állíts elő egy boolean értéket a "szam" változóban eltárolt értékből.
* A boolean érték legyen true, ha a "szam" változó értéke páros volt és legyen false ha páratlan volt.
*/

var szam = 4;
console.log(szam % 2 === 0);


/*
 * Inkrementáld a memóriában count változó értékét annyi alkalommal, hogy a "count > target" kifejezés true-ra értékelődjön ki.
 */

 var count = 0;
 var target = 5;

count++;
count++;
count++;
count++;
count++;
count++;

 console.log(count > target);

 /*
 * Kérd ki a cars tömb második elemét és logold ki.
 * Módosítsd meg a cars tömb harmadik elemét "Suzuki" értékre.
 */

 var cars = ['VW', 'BMW', 'Audi'];

 console.log(cars[1]);
 cars[2] = "Suzuki";
 console.log(cars);

 /*
 * Adj hozzá az alábbi objektumhoz egy új kulcsot "age" néven és kösd be alá a 25 értéket
 */

 var person = {
     firstName: 'József',
     lastName: 'Kovács'
 };

person.age = 25;
console.log(person);
 