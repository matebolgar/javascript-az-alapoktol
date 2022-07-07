var szamok = [2, 4, 13, 4, 6, 12];

// páros számok

var parosakSzama = 0;

/**
 * Ciklusok (loop)
 */

// while
// addíg fut amig a feltétel igaz!

var index = 0;
var paratlanokSzama = 0;
while (index < szamok.length) {
    paratlanokSzama += szamok[index] % 2 === 1 ? 1 : 0;
    index++;
}


// for (loop)
var paratlanokSzama2 = 0;
for (let i = 0; i < szamok.length; i++) {
    paratlanokSzama2 += szamok[i] % 2 === 1 ? 1 : 0;
}

//console.log(paratlanokSzama2);


// for - of
var parosSzama2 = 0;

for (var szam of szamok) {
    parosSzama2 += szam % 2 === 0 ? 1 : 0;
    //console.log(szam);    
}
console.log(parosSzama2);