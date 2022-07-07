"use strict";

/*
    Product

    Create
    Read
    Update
    Delete

    CRUD
    
*/
var state = {
  products: [{
    id: uuidv4(),
    name: 'Teszt termék 1',
    price: 2500,
    isInStock: true
  }, {
    id: uuidv4(),
    name: 'Teszt termék 2',
    price: 3500,
    isInStock: false
  }, {
    id: uuidv4(),
    name: 'Teszt termék 3',
    price: 5500,
    isInStock: true
  }],
  editedId: '' // szerkesztésre kiválasztott termék id-ja

};
/**
 * Egyedi azonosító (id) generálása az új termék felvitelhez így a későbbiekben be lehet azonosítani
 * a kiválasztott terméket (törlésre, szerkesztésre)
 * 
 * @returns [string] egyedi azonosító 
 */

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}
/**
 * Termékek megjelenítése :
 *  - Ha nincs készleten akkor piros háttér
 *  - Szerkesztés gomb
 *  - Törlés gomb
 */


function renderProducts() {
  if (state.products.length === 0) {
    document.getElementById('product-list-component').innerHTML = "\n            <h2>Nincs term\xE9k!</h2>";
    return;
  } // összár HTML létrehozása


  var productPricesHTML = "\n        <form id=\"form-product-prices\">\n            <div class=\"col\">\n                <button class=\"btn btn-info mr-2\" type=\"submit\">Term\xE9kek \xF6ssz \xE1ra: </button>\n                <input id=\"all-product-prices\" type=\"text\" readonly value=\"0\">\n            </div>\n        </form>\n    "; // termék összár renderelés

  document.getElementById('product-prices-component').innerHTML = productPricesHTML; // keresés HTML létrehozása

  var productSearchHTML = "\n        <form id=\"form-product-search\">\n            <div class=\"col\">\n                <input name=\"search_price_tol\" type=\"number\" placeholder=\"t\xF3l\">\n                <input name=\"search_price_ig\" type=\"number\" placeholder=\"ig\">\n                <button class=\"btn btn-info mr-2\" type=\"submit\">Keres\xE9s</button>                \n            </div>\n        </form>\n    "; // termék összár renderelés

  document.getElementById('product-search-component').innerHTML = productSearchHTML; // terméklista összerakás

  var productListHTML = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _product3 = _step.value;
      productListHTML += "\n            <div class=\"col-lg-3 card m-2 p-2 ".concat(_product3.isInStock ? '' : 'bg-info', "\">\n                <p>").concat(_product3.name, "</p>\n                <p>").concat(_product3.price, "</p>\n                <p>").concat(_product3.isInStock ? 'Elérhető' : 'Elfogyott', "</p>\n                <button class=\"btn bg-warning edit-button mb-2\" data-productid=\"").concat(_product3.id, "\">Szerkeszt\xE9s</button>\n                <button class=\"btn bg-danger delete-button\" data-productid=\"").concat(_product3.id, "\">T\xF6rl\xE9s</button>\n            </div>\n        ");
    } // terméklista renderelése

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  document.getElementById('product-list-component').innerHTML = productListHTML; //események leprogramozása
  // termékszerkesztés esemény

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = document.querySelectorAll('.edit-button')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var editBtn = _step2.value;

      editBtn.onclick = function (event) {
        var pid = event.target.dataset.productid;
        state.editedId = pid; // meg kell jeleníteni a szerkesztés formot

        renderEditedProduct();
      };
    } // termék törlése esemény

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = document.querySelectorAll('.delete-button')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var delBtn = _step3.value;

      delBtn.onclick = function (event) {
        var pid = event.target.dataset.productid;
        var productIndex = getProductArrayIndex(pid); // törlés a tömbből

        state.products.splice(productIndex, 1); // terméklista frissítése

        renderProducts();
      };
    } // termékárak összesítése

  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  document.getElementById('form-product-prices').onsubmit = function (event) {
    // alap HTML küldés letiltása
    event.preventDefault(); // végig kell menni az összes terméken és amelyikből van készleten az össze kell gyűjteni

    var allPrices = 0;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = state.products[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _product = _step4.value;

        if (_product.isInStock) {
          // van készleten
          allPrices += _product.price;
        }
      } // termék összár mehet a mezőbe ha van....

    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    if (allPrices > 0) {
      document.getElementById('all-product-prices').value = allPrices;
    } else {
      document.getElementById('all-product-prices').value = 'Nincs termék készleten!';
    }
  }; // keresés Tól-Ig ár alapján...


  document.getElementById('form-product-search').onsubmit = function (event) {
    // HTML küldés off
    event.preventDefault();
    var divSearchResult = document.getElementById('product-search-result');
    divSearchResult.innerHTML = ''; // tól-ig árak bekérése

    var rTol = Number(event.target.elements.search_price_tol.value);
    var rIg = Number(event.target.elements.search_price_ig.value); // HTML template összerakása

    var bTalalat = false;
    var searchResultHTML = "\n            <div class=\"row\">\n                <div class=\"col-12\">\n                    <h2>Keres\xE9s eredm\xE9nye:</h2>\n                </div>\n            </div>\n            <div class=\"row\">";
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = state.products[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _product2 = _step5.value;

        if (_product2.price >= rTol && _product2.price <= rIg && _product2.isInStock) {
          bTalalat = true;
          searchResultHTML += "\n                    <div class=\"col-lg-3\">\n                        <div class=\"card m-2 p-2\">\n                            <p>".concat(_product2.name, "</p>\n                            <p>").concat(_product2.price, "</p>\n                        </div>\n                    </div>\n                ");
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    searchResultHTML += '</div>';

    if (bTalalat) {
      divSearchResult.innerHTML = searchResultHTML;
    } else {
      divSearchResult.innerHTML = '<h3 class="text-info">Sajnálom, nincs ilyen termékünk!</h3>';
    }
  }; // keresés szöveg alapján


  document.getElementById('text-search-form').onsubmit = function (event) {
    // alap HTML küldés kikapcsolás
    event.preventDefault();
    var sSearchText = event.target.elements.searchText.value;
    var divSearchResult = document.getElementById('product-search-text-result');
    var bTalalat = false;
    var searchResultHTML = "\n            <div class=\"row\">\n                <div class=\"col-12\">\n                    <h2>Keres\xE9s eredm\xE9nye:</h2>\n                </div>\n            </div>\n            <div class=\"row\">"; // azok a készleten lévő termékek kellenek amikben van hasonló szöveg...like...

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = state.products[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        product = _step6.value;

        // csak a készletenlévők kellenek
        if (product.isInStock) {
          if (product.name.indexOf(sSearchText) >= 0) {
            bTalalat = true;
            searchResultHTML += "\n                        <div class=\"col-lg-3\">\n                            <div class=\"card m-2 p-2\">\n                                <p>".concat(product.name, "</p>\n                                <p>").concat(product.price, "</p>\n                            </div>\n                        </div>\n                    ");
          }
        }
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    searchResultHTML += '</div>';

    if (bTalalat) {
      divSearchResult.innerHTML = searchResultHTML;
    } else {
      divSearchResult.innerHTML = '<h3 class="text-info">Sajnálom, nincs ilyen termékünk!</h3>';
    }
  };
}
/**
 * Termékszerkesztés form
 * Kiválasztott termék id-ja a state.editedId -ban van
 */


function renderEditedProduct() {
  // ha nincs beállítva az id akkor szerkesztés HTML tartalom törlés és kilépés
  if (state.editedId === '') {
    document.getElementById('edit-product').innerHTML = '';
    return;
  } // kell a termék tömbindexe az adatok miatt:


  var pArrayIndex = getProductArrayIndex(state.editedId);
  var pName = state.products[pArrayIndex].name;
  var pPrice = state.products[pArrayIndex].price;
  var pIsInStock = state.products[pArrayIndex].isInStock; // form összerakása

  var editedFormHTML = "\n        <form id=\"edit-product-form\" class=\"p-5\">\n            <label class=\"w-100\">\n              N\xE9v:\n              <input class=\"form-control\" type=\"text\" name=\"name\" value=\"".concat(pName, "\">\n            </label>\n            <label class=\"w-100\">\n              \xC1r:\n              <input class=\"form-control\" type=\"number\" name=\"price\" value=\"").concat(pPrice, "\">\n            </label>\n            <label class=\"w-100\">\n              Van k\xE9szleten?\n              <input class=\"form-control\" type=\"checkbox\" name=\"isInStock\" ").concat(pIsInStock ? "checked" : "", ">\n            </label>\n            <button class=\"btn btn-primary\" type=\"submit\">Adatok friss\xEDt\xE9se</button>\n        </form>\n    "); // form render

  document.getElementById('edit-product').innerHTML = editedFormHTML; // form submit esemény

  document.getElementById('edit-product-form').onsubmit = function (event) {
    // alap HTML küldés letiltása
    event.preventDefault(); // adatok a formról

    var pName = event.target.elements.name.value;
    var pPrice = Number(event.target.elements.price.value);
    var pIsStock = event.target.elements.isInStock.checked;
    var index = getProductArrayIndex(state.editedId); // frissítés

    state.products[index].name = pName;
    state.products[index].price = pPrice;
    state.products[index].isInStock = pIsStock; // szerkesztés vége

    state.editedId = ''; // terméklista frissítése

    renderProducts(); // szerkesztés elrejtése

    renderEditedProduct();
  };
}
/**
 * Termék felvitele a tömbbe
 */


document.getElementById('create-product').onsubmit = function (event) {
  // alap HTML küldés letiltása
  event.preventDefault(); // új termékadatok a formról

  var pName = event.target.elements.name.value;
  var pPrice = Number(event.target.elements.price.value);
  var pIsStock = event.target.elements.isInStock.checked; // adatok mehetnek a tömbbe

  state.products.push({
    id: uuidv4(),
    name: pName,
    price: pPrice,
    isInStock: pIsStock
  }); // terméklista frissítése

  renderProducts();
};
/**
 * Az adott id-jű termék tömbindexét adja vissza
 * @param {string} productId 
 */


function getProductArrayIndex(productId) {
  for (var index = 0; index < state.products.length; index++) {
    if (state.products[index].id === productId) {
      // megvan a termék, kilépés a tömbindexel
      return index;
    }
  }
}

window.onload = renderProducts();