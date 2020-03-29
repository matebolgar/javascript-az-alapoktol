/*
 * Call stack
 */

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
  setTimeout(function () {
    console.log('Később hajtódik végre');
  }, 0);
  console.log("Adj hozzá paprikát");
}

console.log("Első sor kód ami végrehajtódik");
susdMegARantottat();
console.log("script lefutott");
