/* fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(res => console.log(res)) */

// komment (line comment)
/* 
    blokk 
    komment
*/

/**
 * Adattípusok
 */

// string vagy karakterfűzér
console.log('szia');
console.log("szia");

// nagybetűs
// nézzük meg mennyi karakerből áll
// fordítsuk meg (reverse)
// fűűzünk hozzá másik stringet

// number számok

console.log(500);

// műveletek.... + - * /

// boolean (igaz/hamis)

console.log(true);
console.log(false);


// undefined
console.log(undefined);

// null
console.log(null);



/**
 * Array (tömb)
 */

// Array<_>
// array of ?

// Array<string>

console.log(['első', 'második', 'harmadik']);

console.log([1, 2, 3]);

// szűrés
// sorba rendezés
// új elem hozzáadása
// aggregálás

// tömbünk 1. eleme = 2!!
console.log([1, 2, 3][1]);

//változó típusú tömbök: (VESZÉLYES A HASZNÁLATA!!!!! A CSOPORTOS MŰVELETEK MIATT!!!)
console.log([true, 2, "3 szöveg"]);

// több dimenziósak -- 1,1 -elem kikérése = 5
console.log([[1, 2, 3], [4, 5, 6], [7, 8, 9]][1][1]);

/**
 * Object (objektumok)
 */

// kulcs- érték párok sorozata

console.log(
    {
        firstName: "Józsi",
        lastName: "Kovács",
        age: 34
    }
);

// lookup  -kulcsalapú kikérés kétféle képpen:
console.log(
    {
        firstName: "Józsi",
        lastName: "Kovács",
        age: 34
    }.lastName
);
console.log(
    {
        firstName: "Józsi",
        lastName: "Kovács",
        age: 34
    }["lastName"]
);

// kombinálás....objektum az objektumban...
console.log(
    {
        firstName: "Józsi",
        lastName: "Kovács",
        age: 34,
        phoneNumbers: ["06301222", "06202342"],
        address: {
            street: "Petőfi",
            city: "TAB" 
        }
    }.phoneNumbers[1]
);

console.log(
    [
        {
            brand: 'Apple',
            name: 'iPhone X',
            price: 250000,
            provider: {
                country: 'HU',
                name: 'VodaFone'
            }
        },
        {
            brand: 'Huawei',
            name: 'i10',
            price: 50000,
            provider: {
                country: 'DE',
                name: 'Westel'
            }
        },
        {
            brand: 'ZTE',
            name: 'Blade',
            price: 110000,
            provider: {
                country: 'DE',
                name: 'VodaFone'
            }
        }
    ]
);

// feladat:
// 1. Az első telefon neve
// 2. A második telefon ára
// 3. A harmadik telefon szolgáltatójának országa

// 1. Az első telefon neve :

console.log(
    [
        {
            brand: 'Apple',
            name: 'iPhone X',
            price: 250000,
            provider: {
                country: 'HU',
                name: 'VodaFone'
            }
        },
        {
            brand: 'Huawei',
            name: 'i10',
            price: 50000,
            provider: {
                country: 'DE',
                name: 'Westel'
            }
        },
        {
            brand: 'ZTE',
            name: 'Blade',
            price: 110000,
            provider: {
                country: 'DE',
                name: 'VodaFone'
            }
        }
    ][0].name
);


// 2. A második telefon ára

console.log(
    [
        {
            brand: 'Apple',
            name: 'iPhone X',
            price: 250000,
            provider: {
                country: 'HU',
                name: 'VodaFone'
            }
        },
        {
            brand: 'Huawei',
            name: 'i10',
            price: 50000,
            provider: {
                country: 'DE',
                name: 'Westel'
            }
        },
        {
            brand: 'ZTE',
            name: 'Blade',
            price: 110000,
            provider: {
                country: 'DE',
                name: 'VodaFone'
            }
        }
    ][1].price
);


// 3. A harmadik telefon szolgáltatójának országa

console.log(
        [
            {
                brand: 'Apple',
                name: 'iPhone X',
                price: 250000,
                provider: {
                    country: 'HU',
                    name: 'VodaFone'
                }
            },
            {
                brand: 'Huawei',
                name: 'i10',
                price: 50000,
                provider: {
                    country: 'DE',
                    name: 'Westel'
                }
            },
            {
                brand: 'ZTE',
                name: 'Blade',
                price: 110000,
                provider: {
                    country: 'DE',
                    name: 'VodaFone'
                }
            }
    ][2].provider.country
);

/**
 * Operátorok
 */

console.log(2 + 3);

/**
   Operaátorok csoportosítása
  
        -operandusok szerint:
            1: unary
            2: binary
            3: ternary
        - operátor lexikális elhelyezkedése:
            előtte: prefix
            közötte: infix
            utána: postfix
        - hajt-e végre mellékhatást? (side effect)
            igen
            nem
 
 */

/**
 * Aritmetikai
 *  (number, number) -> number
 */

// +, -, *, /, %
console.log(2 + 4);
console.log(2 - 4);
console.log(2 * 4);
console.log(2 / 4);
console.log(7 % 3); //maradékot adja vissza (mod)


/**
 * Összehasonlító
 * (any, any) -> boolean
 */

// ==
console.log(2 == 2);    // true
console.log(3 == 2);    // false
console.log(2 == "2");  // true mert gyengén típusos a JS !! Átkonvertálja a stringet számmá

// !=
console.log(2 != 2);    // igaz-e az hogy 2 != 2 ?? eredmény: false mert a 2 = 2

// ===
console.log(1 === true);    // szigorúbb (típusos!!) ellenörzés. Eredmény: false
console.log(1 !== true);    // eredmény: true mert az 1 nem egyenlő a true-val

// >, <, >=, <=
console.log(3 > 5);

/**
 * Logikai
 * (boolean, boolean) -> boolean
 * (boolean) -> boolean
 */

// logikai és csak akkor true ha mindegyik true
console.log(true && false);     // false
console.log(false && false);    // false
console.log(true && true);      // true

// logikai vagy akkor true ha egyik true
console.log(true || false);     // true
console.log(false || false);    // false

// negálás  !
console.log(!true);     // false
console.log(!false);    // true

/**
 * String operátor
 */

// konkaktenálás
console.log("Szia" + " Csaba");

/** 
 * conditional
 * (bool, any, any) -> any
 */

console.log(true ? 'első' : 'második');


/**
 * Assignment
 * (var, any) -> any
 */

var valtozo;        // undefined
console.log(valtozo);

valtozo = 'szia';
console.log(valtozo);
//JS dinamikus nyelv:
valtozo = 3;    
console.log(valtozo);


// increment, decrement
valtozo++;
console.log(valtozo);
valtozo--;
console.log(valtozo);

// +=, -=, *=, /=
valtozo += 5;
console.log(valtozo);
valtozo -= 12;
console.log(valtozo);
var ss = "Szia ";
ss += "Csaba";
console.log(ss);












