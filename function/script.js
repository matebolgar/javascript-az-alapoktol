/*
 * Function
 */

// alprogram, subroutine

function susdMegARantottat() {
  console.log("Önts olajat a serpenyőbe");
  console.log("Adj hozzá 3 tojást");
  adjHozzaFuszereket();
  console.log("Süsd 4 percig");
  console.log("Kész");
}

function adjHozzaFuszereket() {
  console.log("Adj hozzá sót");
  console.log("Adj hozzá borsot");
  console.log("Adj hozzá paprikát");
}

// function call, függvény meghívása

susdMegARantottat();
console.log("----");
susdMegARantottat();
console.log("----");
susdMegARantottat();

// Function, matematikai függvény
// input adatból output adatot kigeneráló eszköz

// (number) -> number
function addOne(szam) {
  return szam + 1;
}

console.log(addOne(addOne(addOne(3))));

console.log(addTwo(addTwo(0)));

// (number) -> number
function addTwo(szam) {
  // table lookup
  return {
    0: 2,
    1: 3,
    2: 4
    // ...
  }[szam];
}



// first class citizen
// anoním function
// console.log(addThree(4));

var addThree = function(szam) {
  return szam + 3;
};

