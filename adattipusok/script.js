
// komment (line comment)

/*
blokk
komment
*/

/*
* Adattípusok
*/

// string (karakterfűzér)
console.log('szia');
console.log("szia");

// tegyük nagybetűssé
// nézzük meg hány karakterkből áll
// fordítsuk (reverse)
// fűzzünk hozzá egy másik stringet

// number (szám)

console.log(500);

// adjunk hozzá egy másik számot
// vonjunk ki belőle
// osztás utáni maradék


// boolean (igaz hamis értéket reprezentáló típus)

console.log(true);
console.log(false);

// logikai ÉS
// (boolean, boolean) -> boolean

// negálás
// ...

// undefined
console.log(undefined);

// null
console.log(null)

/*
* Array (tömb)
*/

// Array<_>
// array of ?

// Array<string>

console.log(['elso', 'masodik', 'harmadik']);

// Array<number>
console.log([2, 12, 3]);

// szűrés
// sorba rendezés
// új elem hozzáadása
// aggregálás


console.log([2, 12, 3][1]);


// nem javasolt
console.log([true, 2, "string.."]);

// több dimenziós tömb

// Array<Array<number>>
console.log([[2, 3], [32, 10], [6, 4]][1][1]);

/*
* Object (objektum)
*/

// kulcs- érték párok sorozata

console.log(
    {
        firstName: 'József',
        lastName: 'Kovács',
        age: 30
    }.lastName
);

// lookup, kulcs alapú kikérés
console.log(
    {
        firstName: 'József',
        lastName: 'Kovács',
        age: 30
    }['lastName']
);

console.log(
    {
        firstName: 'József',
        lastName: 'Kovács',
        age: 30,
        phoneNumbers: ['067023456', '067023457'],
        address: {
            street: 'Király u.',
            city: 'Budapest'
        }
    }.phoneNumbers[0]
);

// 1. Az első telefon nevét

console.log(
    [
        {
            brand: 'Apple',
            name: 'iPhone X',
            price: 250000,
            provider: {
                country: 'HU',
                name: 'Vodafone'
            }
        },
        {
            brand: 'Huawei',
            name: '10',
            price: 180000,
            provider: {
                country: 'DE',
                name: 'T-Mobile'
            }
        },
        {
            brand: 'ZTE',
            name: 'Blade',
            price: 110000,
            provider: {
                country: 'DE',
                name: 'Vodafone'
            }
        }
    ][0].name
)

// 2. A második telefon árát
console.log(
    [
        {
            brand: 'Apple',
            name: 'iPhone X',
            price: 250000,
            provider: {
                country: 'HU',
                name: 'Vodafone'
            }
        },
        {
            brand: 'Huawei',
            name: '10',
            price: 180000,
            provider: {
                country: 'DE',
                name: 'T-Mobile'
            }
        },
        {
            brand: 'ZTE',
            name: 'Blade',
            price: 110000,
            provider: {
                country: 'DE',
                name: 'Vodafone'
            }
        }
    ][1].price
)


// 3. A harmadik telefon szolgáltatójának országát
console.log(
    [
        {
            brand: 'Apple',
            name: 'iPhone X',
            price: 250000,
            provider: {
                country: 'HU',
                name: 'Vodafone'
            }
        },
        {
            brand: 'Huawei',
            name: '10',
            price: 180000,
            provider: {
                country: 'DE',
                name: 'T-Mobile'
            }
        },
        {
            brand: 'ZTE',
            name: 'Blade',
            price: 110000,
            provider: {
                country: 'DE',
                name: 'Vodafone'
            }
        }
    ][2].provider.country
)














































