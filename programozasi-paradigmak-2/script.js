/*
* Programozási paradigmák
*/

// Procedurális
// C, PHP, JavaScript

var product = {
  name: 'Fűnyíró',
  price: 75000,
  isInStock: true,
};

product.price *= 0.9;

var message = `A termék neve: ${product.name}, ára: ${product.price} és 
${product.isInStock ? 'van készleten' : 'nincs készleten'}`;

console.log(message);

/*
* Funkcionális
*/
// Lisp, Haskell, Clojure, F#, (JavaScript)

// pure function
// side effect nélkül
// _ -> _

// pipeline-ok


// (Product, number) -> Product
function withDiscount(product, discount) {
  return {
    name: product.name, 
    price: product.price * discount, 
    isInStock: product.isInStock, 
  }
}

// (Product) -> string
function toMessage(product) {
  return `A termék neve: ${product.name}, ára: ${product.price} és 
  ${product.isInStock ? 'van készleten' : 'nincs készleten'}`;
}

// immutable value
var product2 = {
  name: 'Fűnyíró',
  price: 75000,
  isInStock: true,
};

console.log(toMessage(withDiscount(product2, 0.9)));


/*
* Objektum orientált
*/

// Java, C#, PHP, JavaScript

var Product = {

  // property / field
  name: 'Fűnyíró',
  price: 75000,
  isInStock: true,

  // method

  // (number) -> void
  applyDiscount: function (discount) {
      this.price = this.price * discount
  },

  // () -> string
  getMessage: function () {
      return `A termék neve: ${this.name}, ára: ${this.price} és 
      ${this.isInStock ? 'van készleten' : 'nincs készleten'}`
  }
}

Product.applyDiscount(0.9);
console.log(Product.getMessage());

/*
    Funkcionális: fuggveny(adat, parameter)

    Objektum orientált: adat.fuggveny(parameter)
*/

// Function constructor

function Termek(name, price, isInStock) {
  this.name = name;
  this.price = price;
  this.isInStock = isInStock;
}

Termek.prototype.applyDiscount = function (discount) {
  this.price = this.price * discount
}

Termek.prototype.getMessage = function () {
  return `A termék neve: ${this.name}, ára: ${this.price} és 
  ${this.isInStock ? 'van készleten' : 'nincs készleten'}`
}

// {name: 'Lapát', price: 4200, isInStock: false}
// instantiation/példányosítás
var termek1 = new Termek('Lapát', 4200, false);

termek1.applyDiscount(0.8);

var termek2 = new Termek('Gereblye', 5800, true);

console.log(termek1.getMessage());

console.log(termek1);
console.log(termek2.getMessage());

// szerver oldalról érkezik adat (pl tömbnyi termék JSON formátumban)
// JSON -> Array<Termek>
/*
    for(var product of products) {
      product.applyDiscount(0.9);
      product.getMessage();
    }
*/

// class deklaráció 
class Termek2 {
  name;
  price;
  isInStock;

  constructor(name, price, isInStock) {
    this.name = name;
    this.price = price;
    this.isInStock = isInStock;
  }

  applyDiscount(discount) {
    this.price = this.price * discount
  }

  getMessage () {
    return `A termék neve: ${this.name}, ára: ${this.price} és 
    ${this.isInStock ? 'van készleten' : 'nincs készleten'}`
  }

  // God object
  render() {

  }

  store() {

  }

}

var termek3 = new Termek2('Kalapács', 5000, true);
termek3.applyDiscount(0.85);
console.log(termek3.getMessage());














