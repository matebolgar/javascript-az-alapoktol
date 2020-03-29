/*
* Változó deklarálása
* var, let, const
* ES6
* transpiler: régi JS -> ES6 (Babel)
*/


// block scoped változók

if(true) {
    let valtozo = "teszt";

    console.log(valtozo);
}


for(let person of ['Dániel', 'Péter', 'Júlia']) {

    console.log(person);
}

const person = "Tilla";

// person = "Orsi"

console.log(person);

const people = ['Dániel', 'Péter', 'Júlia'];

people.push('Marcell');

console.log(people);

const person2 = {
    name: 'Gipsz Jakab'
};

person2.age = 20;

person2 = 5;

console.log(person2);













