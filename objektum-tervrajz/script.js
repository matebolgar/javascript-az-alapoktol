/*
 * Programozási paradigmák
 */

// Procedurális
// C, PHP, JavaScript

var product = {
  name: "Fűnyíró",
  price: 75000,
  isInStock: true
};

product.price *= 0.9;

var message = `A termék neve: ${product.name}, ára: ${product.price} és 
${product.isInStock ? "van készleten" : "nincs készleten"}`;

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
    isInStock: product.isInStock
  };
}

// (Product) -> string
function toMessage(product) {
  return `A termék neve: ${product.name}, ára: ${product.price} és 
  ${product.isInStock ? "van készleten" : "nincs készleten"}`;
}

// immutable value
var product2 = {
  name: "Fűnyíró",
  price: 75000,
  isInStock: true
};

console.log(toMessage(withDiscount(product2, 0.9)));

/*
 * Objektum orientált
 */

// Java, C#, PHP, JavaScript

var Product = {
  // property / field
  name: "Fűnyíró",
  price: 75000,
  isInStock: true,

  // method

  // (number) -> void
  applyDiscount: function(discount) {
    this.price = this.price * discount;
  },

  // () -> string
  getMessage: function() {
    return `A termék neve: ${this.name}, ára: ${this.price} és 
      ${this.isInStock ? "van készleten" : "nincs készleten"}`;
  }
};

Product.applyDiscount(0.9);
console.log(Product.getMessage());

/*
    Funkcionális: fuggveny(adat, parameter)

    Objektum orientált: adat.fuggveny(parameter)
*/

// Constructor function

function Termek(name, price, isInStock) {
  this.name = name;
  this.price = price;
  this.isInStock = isInStock;
}

Termek.prototype.applyDiscount = function(discount) {
  this.price = this.price * discount;
};

Termek.prototype.getMessage = function() {
  return `A termék neve: ${this.name}, ára: ${this.price} és 
  ${this.isInStock ? "van készleten" : "nincs készleten"}`;
};

// példányosítás, instantiation
// new Termek('Kasza', 23000, true),

var termekek = [
  new Termek("Kasza", 23000, true),
  new Termek("Kasza1", 23000, true),
  new Termek("Kasza2", 23000, true),
  new Termek("Kasza3", 23000, true)
];

for (var termek of termekek) {
  console.log(termek.getMessage());
}

class Termek_ {
  quantity = 10;
  constructor(name, price, isInStock) {
    this.name = name;
    this.price = price;
    this.isInStock = isInStock;
  }

  applyDiscount(discount) {
    this.price = this.price * discount;
  }

  getMessage() {
    return `A termék neve: ${this.name}, ára: ${this.price} és 
    ${this.isInStock ? "van készleten" : "nincs készleten"}`;
  }
}

var termek2 = new Termek_("Ásó", 4300, false);
termek2.applyDiscount(0.8);
termek2.applyDiscount(0.8);
termek2.applyDiscount(0.8);
console.log(termek2.getMessage());
