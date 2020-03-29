/*
 * Try/catch hibakezelés
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

  if(false) {
    throw new Error('Hiba oka');
  }

  setTimeout(function() {
    console.log("aszinkron hiba lekezelve");
    console.log("Később hajtódik végre");
  }, 0);
  console.log("Adj hozzá paprikát");
}

console.log("Első sor kód ami végrehajtódik");
try {
  susdMegARantottat();
  console.log("teszt");
} catch (error) {
  console.log("Hiba elkapva: ", error);
}
console.log("script lefutott");
