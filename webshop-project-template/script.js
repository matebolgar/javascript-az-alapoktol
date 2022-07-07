/*
    Product

    Create
    Read
    Update
    Delete

    CRUD
    
*/

var state = {
    products: [
        {
            id: uuidv4(),
            name: 'Teszt termék 1',
            price: 2500,
            isInStock: true
        },
        {
            id: uuidv4(),
            name: 'Teszt termék 2',
            price: 3500,
            isInStock: false
        },
        {
            id: uuidv4(),
            name: 'Teszt termék 3',
            price: 5500,
            isInStock: true
        }
    ],
    editedId: ''    // szerkesztésre kiválasztott termék id-ja
}

/**
 * Egyedi azonosító (id) generálása az új termék felvitelhez így a későbbiekben be lehet azonosítani
 * a kiválasztott terméket (törlésre, szerkesztésre)
 * 
 * @returns [string] egyedi azonosító 
 */
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


/**
 * Termékek megjelenítése :
 *  - Ha nincs készleten akkor piros háttér
 *  - Szerkesztés gomb
 *  - Törlés gomb
 */
function renderProducts() {

    if (state.products.length === 0) {
        document.getElementById('product-list-component').innerHTML = `
            <h2>Nincs termék!</h2>`;
        return;
    }

    // összár HTML létrehozása
    var productPricesHTML = `
        <form id="form-product-prices">
            <div class="col">
                <button class="btn btn-info mr-2" type="submit">Termékek össz ára: </button>
                <input id="all-product-prices" type="text" readonly value="0">
            </div>
        </form>
    `;
    // termék összár renderelés
    document.getElementById('product-prices-component').innerHTML = productPricesHTML;

    // keresés HTML létrehozása
    var productSearchHTML = `
        <form id="form-product-search">
            <div class="col">
                <input name="search_price_tol" type="number" placeholder="tól">
                <input name="search_price_ig" type="number" placeholder="ig">
                <button class="btn btn-info mr-2" type="submit">Keresés</button>                
            </div>
        </form>
    `;
    // termék összár renderelés
    document.getElementById('product-search-component').innerHTML = productSearchHTML;

    // terméklista összerakás
    var productListHTML = '';
    for (const product of state.products) {
        productListHTML += `
            <div class="col-lg-3 card m-2 p-2 ${product.isInStock ? '' : 'bg-info'}">
                <p>${product.name}</p>
                <p>${product.price}</p>
                <p>${product.isInStock ? 'Elérhető' : 'Elfogyott'}</p>
                <button class="btn bg-warning edit-button mb-2" data-productid="${product.id}">Szerkesztés</button>
                <button class="btn bg-danger delete-button" data-productid="${product.id}">Törlés</button>
            </div>
        `;
    }
    // terméklista renderelése
    document.getElementById('product-list-component').innerHTML = productListHTML;



    //események leprogramozása
    
    // termékszerkesztés esemény
    for (const editBtn of document.querySelectorAll('.edit-button')) {
        editBtn.onclick = (event) => {
            var pid = event.target.dataset.productid;
            state.editedId = pid;

            // meg kell jeleníteni a szerkesztés formot
            renderEditedProduct();
        }
    }

    // termék törlése esemény
    for (const delBtn of document.querySelectorAll('.delete-button')) {
        delBtn.onclick = (event) => {
            var pid = event.target.dataset.productid;
            var productIndex = getProductArrayIndex(pid);

            // törlés a tömbből
            state.products.splice(productIndex, 1);

            // terméklista frissítése
            renderProducts();
        }
    }

    // termékárak összesítése
    document.getElementById('form-product-prices').onsubmit = function (event) {
        // alap HTML küldés letiltása
        event.preventDefault();

        // végig kell menni az összes terméken és amelyikből van készleten az össze kell gyűjteni
        var allPrices = 0;
        for (const product of state.products) {
            if (product.isInStock) {
                // van készleten
                allPrices += product.price;
            }
        }
        // termék összár mehet a mezőbe ha van....
        if (allPrices > 0) {
            document.getElementById('all-product-prices').value = allPrices;
        } else {
            document.getElementById('all-product-prices').value = 'Nincs termék készleten!';
        }
    }

    // keresés Tól-Ig ár alapján...
    document.getElementById('form-product-search').onsubmit = (event) => {
        // HTML küldés off
        event.preventDefault();

        var divSearchResult = document.getElementById('product-search-result');
        divSearchResult.innerHTML = '';

        // tól-ig árak bekérése
        var rTol = Number(event.target.elements.search_price_tol.value);
        var rIg = Number(event.target.elements.search_price_ig.value);

        // HTML template összerakása
        var bTalalat = false;
        var searchResultHTML = `
            <div class="row">
                <div class="col-12">
                    <h2>Keresés eredménye:</h2>
                </div>
            </div>
            <div class="row">`;
        for (const product of state.products) {
            if (product.price >= rTol && product.price <= rIg && product.isInStock) {
                bTalalat = true;
                searchResultHTML += `
                    <div class="col-lg-3">
                        <div class="card m-2 p-2">
                            <p>${product.name}</p>
                            <p>${product.price}</p>
                        </div>
                    </div>
                `;
            }
        }
        searchResultHTML += '</div>'

        if (bTalalat) {
            divSearchResult.innerHTML = searchResultHTML;
        } else {
            divSearchResult.innerHTML = '<h3 class="text-info">Sajnálom, nincs ilyen termékünk!</h3>';
        }
    }

    // keresés szöveg alapján
    document.getElementById('text-search-form').onsubmit = (event) => {
        // alap HTML küldés kikapcsolás
        event.preventDefault();

        var sSearchText = event.target.elements.searchText.value;
        var divSearchResult = document.getElementById('product-search-text-result');

        var bTalalat = false;
        var searchResultHTML = `
            <div class="row">
                <div class="col-12">
                    <h2>Keresés eredménye:</h2>
                </div>
            </div>
            <div class="row">`;

        // azok a készleten lévő termékek kellenek amikben van hasonló szöveg...like...
        for (product of state.products) {
            // csak a készletenlévők kellenek
            if (product.isInStock) {
                if (product.name.indexOf(sSearchText) >= 0) {
                    bTalalat = true;
                    searchResultHTML += `
                        <div class="col-lg-3">
                            <div class="card m-2 p-2">
                                <p>${product.name}</p>
                                <p>${product.price}</p>
                            </div>
                        </div>
                    `;
                }
            }
        }
        searchResultHTML += '</div>'

        if (bTalalat) {
            divSearchResult.innerHTML = searchResultHTML;
        } else {
            divSearchResult.innerHTML = '<h3 class="text-info">Sajnálom, nincs ilyen termékünk!</h3>';
        }

    }

    
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
    }

    // kell a termék tömbindexe az adatok miatt:
    var pArrayIndex = getProductArrayIndex(state.editedId);
    var pName = state.products[pArrayIndex].name;
    var pPrice = state.products[pArrayIndex].price;
    var pIsInStock = state.products[pArrayIndex].isInStock;


    // form összerakása
    var editedFormHTML = `
        <form id="edit-product-form" class="p-5">
            <label class="w-100">
              Név:
              <input class="form-control" type="text" name="name" value="${pName}">
            </label>
            <label class="w-100">
              Ár:
              <input class="form-control" type="number" name="price" value="${pPrice}">
            </label>
            <label class="w-100">
              Van készleten?
              <input class="form-control" type="checkbox" name="isInStock" ${pIsInStock ? "checked" : ""}>
            </label>
            <button class="btn btn-primary" type="submit">Adatok frissítése</button>
        </form>
    `;

    // form render
    document.getElementById('edit-product').innerHTML = editedFormHTML;

    // form submit esemény
    document.getElementById('edit-product-form').onsubmit = (event) => {
        // alap HTML küldés letiltása
        event.preventDefault();

        // adatok a formról
        var pName = event.target.elements.name.value;
        var pPrice = Number(event.target.elements.price.value);
        var pIsStock = event.target.elements.isInStock.checked;
        var index = getProductArrayIndex(state.editedId);

        // frissítés
        state.products[index].name = pName;
        state.products[index].price = pPrice;
        state.products[index].isInStock = pIsStock;

        // szerkesztés vége
        state.editedId = '';

        // terméklista frissítése
        renderProducts();

        // szerkesztés elrejtése
        renderEditedProduct();
    }

}

/**
 * Termék felvitele a tömbbe
 */
document.getElementById('create-product').onsubmit = (event) => {
    // alap HTML küldés letiltása
    event.preventDefault();

    // új termékadatok a formról
    var pName = event.target.elements.name.value;
    var pPrice = Number(event.target.elements.price.value);
    var pIsStock = event.target.elements.isInStock.checked;

    // adatok mehetnek a tömbbe
    state.products.push({
        id: uuidv4(),
        name: pName,
        price: pPrice,
        isInStock: pIsStock
    })

    // terméklista frissítése
    renderProducts();
}


/**
 * Az adott id-jű termék tömbindexét adja vissza
 * @param {string} productId 
 */
function getProductArrayIndex(productId) {
    for (let index = 0; index < state.products.length; index++) {
        if (state.products[index].id === productId) {
            // megvan a termék, kilépés a tömbindexel
            return index;
        }        
    }
}


window.onload = renderProducts();