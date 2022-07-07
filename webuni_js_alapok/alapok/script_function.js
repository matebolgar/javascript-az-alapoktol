/**
 * Function
 */

// alprogram, subroutin

function susdMegARantottat() {
    console.log('Önts olajat a serpenyőbe');
    console.log('Adj hozzá 3 tojást');
    adjHozzaFuszereket();
    console.log('Adj hozzá fűszereket');
    console.log('Süsd 4 percig');
    console.log('Kész');
}

function adjHozzaFuszereket() {
    console.log('Adj hozzá sót');
    console.log('Adj hozzá borsot');
    console.log('Adj hozzá paprikát');
}

// function call

susdMegARantottat();
console.log('-------------');
susdMegARantottat();

// function, matematikai függvény
// inout adatból output adatot kigeneráló eszköz

function addOne(szam) {
    return szam + 1;
}

console.log(addOne(10));
console.log(addOne(addOne(addOne(5))));

// table lookup...
function addTwo(szam) {
    return {
        0: 2,
        1: 3,
        2: 4
    }[szam]
}

console.log(addTwo(addTwo(0)));


// ez rossz:
//console.log(addThree(13));
// first class citizen
// anoním function, csak a deklaráció után hívható meg!! (var!!!)

var addThree = function (szam) {
    return szam + 3;
}

console.log(addThree(13));




