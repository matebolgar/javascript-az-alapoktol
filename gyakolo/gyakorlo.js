let products = {
    cars: [
        {
            id: uuidv4(),
            name: 'Tara',
            year: 2010,
            isInWork: true
        },
        {
            id: uuidv4(),
            name: 'Mary',
            year: 1993,
            isInWork: true
        },
        {
            id: uuidv4(),
            name: 'Dzso',
            year: 1990,
            isInWork: false
        }
    ],
    editedId: ''
};

function renderEditProduct() {

    if (products.editedId === '') {
        document.getElementById('edit-car').innerHTML = "";
        return;
    }

    let foundProduct;
    for (let car of products.cars) {
        if (car.id ===products.editedId) {
            foundProduct = car;
            break;
        }
    } console.log(foundProduct);

    let editFormHTML = `
    <h3>Auto szerkesztése</h3>
            <form id="update-car" action="" class="form-car">
                <label for="name">Tipus</label>
                <input type="text" name="name" value="${foundProduct.name}">
                <label for="year">Kor</label>
                <input type="text" name="year" value="${foundProduct.year} ">
                <label for="isInWork">Forgalomba van?</label>:
                <input type="checkbox"  name="isInWork" id="isInWork" value="${foundProduct.isInWork ? 'checked' : ''}" >
                <button type="submit">Küld</button>
            </form>
       
    `;
    document.getElementById('edit-car').innerHTML = editFormHTML;

    document.getElementById('update-car').onsubmit = function (event) {
        event.preventDefault();
        let name = event.target.elements.name.value;
        let year = event.target.elements.year.value;
        
        let isInWork = event.target.elements.isInWork.checked;

        let foundIndex;
        for (let index = 0; index < products.cars.length; index++) {
            if (products.cars[index].id === products.editedId) {
                foundIndex = index;
                break;
            }
        }
        products.cars[foundIndex] = {
            id: products.editedId,
            name: name,
            year: year,
            isInWork: isInWork
        };

        products.editedId = '';
        renderProductsCar();
        renderEditProduct();


    }
}

    function renderProductsCar() {
        let carsHTML = '';

        for (let car of products.cars) {
            carsHTML += `
        <div class="cars-card" 
        style="
        border:2px solid black;
        margin:2px;
        padding:3px;
        margin: 2% auto;
        width: 50%; ">
        <p>Tipusa : ${car.name},
        <p>Gyártási év: ${car.year},
        <p>Forgalomban: ${car.isInWork},
        <button class="edit-car" data-carid=${car.id}>Szerkeszt</button>
        <button class="delete-car" data-carid=${car.id}>Törlés</button>
       
        </div>
        `;

        }
        document.getElementById('product-list-component').innerHTML = carsHTML;
        
        for (let editBtn of document.querySelectorAll('.edit-car')) {
            editBtn.onclick = function (event) {
                let id = event.target.dataset.carid;
                products.editedId = id;
                renderEditProduct();
            }


    }

    for (let deleteBtn of document.querySelectorAll('.delete-car')) {
        deleteBtn.onclick = function (event) {
            let id = event.target.dataset.carid;
            let foundIndex;
            for (let index = 0; index < products.cars.length; index++) {
                if (products.cars[index].id == id) {
                    foundIndex = index;
                    break;
                }
            } console.log(foundIndex);
            products.cars.splice(foundIndex, 1);
             renderProductsCar();

        }
    }
}
renderProductsCar();
 window.onload = renderPtoducts;

document.getElementById("create-car").onsubmit = function (event) {
    event.preventDefault();

    let name = event.target.elements.name.value;
    let year = event.target.elements.year.value;

    let isInWork = event.target.elements.isInWork.checked;

    products.cars.push(
        {
            id: uuidv4(),
            name: name,
            year: year,
            
            isInWork: isInWork
        }
    )
    renderProductsCar();
    console.log(name, year,  isInWork)
}


/**------------------------------------------------------------------- */
/*****---------------------------------------------------------------- */
let bee = {
    honeys: [
        {
            id: uuidv4(),
            type: "akác",
            price: 4500,
            isInStock: true
        },
        {
            id: uuidv4(),
            type: "repce",
            price: 2500,
            isInStock: true
        },
        {
            id: uuidv4(),
            type: "Erdei",
            price: 3500,
            isInStock: false
        },
        {
            id: uuidv4(),
            type: "napraforgó",
            price: 2500,
            isInStock: true
        }
    ]
}

function renderHoney() {
    let honeyHTML = "";
    for (honey of bee.honeys) {
        honeyHTML += `
        <div class="bee-card">
        <p>${honey.type}
        <p>${honey.price}
        <button class="delete-honey" data-honeyid=${honey.id}>Törlés</button>
        <!-- data-  attirbutumból bármennyi lehet egy adott element kapcsán,
        akkor használatos amikor adatot akarunk egy element-hez hozzá csatlakoztatni -->

        </div>
        `
    }
    document.getElementById('honey-list-component').innerHTML = honeyHTML;




    for (let deleteBtn of document.querySelectorAll('.delete-honey')) {
        deleteBtn.onclick = function (event) {
            let id = event.target.dataset.honeyid;
            let foundIndex;

            for (let index = 0; index < bee.honeys.length; index++) {
                if (bee.honeys[index].id == id) {
                    foundIndex = index;
                    break;
                }
            } console.log(foundIndex);
            bee.honeys.splice(foundIndex, 1);
            renderHoney();
        }
    }
}
renderHoney();

document.getElementById('create-honey').onsubmit = function (event) {
    event.preventDefault();

    let type = event.target.elements.type.value;
    let price = event.target.elements.price.value;
    let isInStock = event.target.elements.isInStock.checked;

    bee.honeys.push({
        type: type,
        price: price,
        isInStock: isInStock
    })
    renderHoney();

    console.log(type);
    console.log(price);
    console.log(isInStock);
}


let meerkat = {
    meerkovo: [
        {
            id: uuidv4(),
            name: 'Alexander',
            age: 80,
            title: "boss"
        },
        {
            id: uuidv4(),
            name: 'Sergei',
            age: 77,
            title: "IT head"
        },
        {
            id: uuidv4(),
            name: 'Maya',
            age: 80,
            title: 'teacher'
        }
    ]
}

function renderMeerkat() {
    meerkatHTML = "";

    for (let meerky of meerkat.meerkovo) {
        meerkatHTML += `
        <div class="meerkat-card">
        <p>Név: ${meerky.name}
        <p>Kor: ${meerky.age}
        <p>Foglalkozás: ${meerky.title}
        <button class="delete-meerkat" data-meerkyid=${meerky.id}>delete</button>
        </div>
        `
    }
    document.getElementById("meerkat-list-component").innerHTML = meerkatHTML




    for (let deleteBtn of document.querySelectorAll('.delete-meerkat')) {
        deleteBtn.onclick = function (event) {
            let id = event.target.dataset.meerkyid;
            let foundIndex;
            for (let index = 0; index < meerkat.meerkovo.length; index++) {
                if (meerkat.meerkovo[index].id == id) {
                    foundIndex = index;
                    break;
                }

            }
            console.log(foundIndex);
            meerkat.meerkovo.splice(foundIndex, 1);
            renderMeerkat();

        }
    }
}
renderMeerkat();
/**create new card */
document.getElementById('create-meerkat').onsubmit = function (event) {
    event.preventDefault();
    let name = event.target.elements.name.value;
    let age = event.target.elements.age.value;
    let title = event.target.elements.title.value;

    meerkat.meerkovo.push(
        {
            name: name,
            age: age,
            title: title
        }
    );
    renderMeerkat();

    console.log(name);
    console.log(age);
    console.log(title);
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}



/*------------------------*/
let isBlurred = false;

// action (esemény)
document.getElementById("element-one").onclick = function () {
    // state change
    isBlurred = !isBlurred;

    // render
    if (isBlurred) {
        document.getElementById("element-one").classList.add("blur");
    } else {
        document.getElementById("element-one").classList.remove("blur");
    }
};




/** */
document.getElementById("element-two").onclick = function () {
    document.getElementById("element-two").style.backgroundColor = "red";
    document.getElementById("element-two").style.borderRadius = "20%";
}


/*-- input mezőre focus és levétele*/
let isFocus = false;
document.getElementById('button-focus').onclick = function () {
    isFocus = !isFocus;
    if (isFocus) {
        document.getElementById('myText').focus();
    } else {
        document.getElementById('myText').blur();
    }
};



/**nodes */
document.getElementById("button-nodes").onclick = function () {
    let c = document.getElementsByTagName("BUTTON")[0];
    let x = c.childNodes[0].nodeValue;
    document.getElementById("demo").innerHTML = x;

}







