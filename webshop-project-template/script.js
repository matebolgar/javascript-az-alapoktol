/*prodact

Create
Read
Update
Delete

CRUD
 */
//belső állapot a memóriában él
let state = {
    products: [
        {
            id: uuidv4(),
            name: 'Test termék 1',
            price: 2300,
            isInStock: true
        },
        {
            id: uuidv4(),
            name: 'Test termék 2',
            price: 4360,
            isInStock: true
        },
        {
            id: uuidv4(),
            name: 'Test termék 3',
            price: 5400,
            isInStock: false
        }
    ]
};

function renderProducts() {
    let productsHTML = '';

    for (let product of state.products) {
        productsHTML += `
        <div class="card m-2 p-2  ${product.isInStock ? "" : "bg-danger"}">
      <p>${product.name}</p>
      <p>  ${product.price}</p>
    
       <button class="btn btn-danger float-right delete-product" data-productid="${product.id}">
       Törlés
     </button>
       </div>
  
        `

    }
    document.getElementById("product-list-component").innerHTML = productsHTML;

    for (let deleteBtn of document.querySelectorAll('.delete-product')) {
        deleteBtn.onclick = function (event) {
            let id = event.target.dataset.productid;
          
            let foundIndex = "";
            for (let index = 0; index < state.products.length; index++) {
                if (state.products[index].id === id) {
                    foundIndex = index;
                    break;
                }
            } 
            console.log(foundIndex)
        }
    }

}

window.onload = renderProducts;


/*************uj termék hozzá adása */
document.getElementById("create-product").onsubmit = function (event) {
    event.preventDefault();
    let name = event.target.elements.name.value;
    let price = Number(event.target.elements.price.value);
    let isInStock = event.target.elements.isInStock.checked;


    state.products.push(
        {
            name: name,
            price: price,
            isInStock: isInStock
        }
    );
    renderProducts();
}
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


/*

let cars = {
    auto:[
        {
            name:"Tara",
            age:18
        },
        {
            name:"Mary",
            age:26   
        },
        {
            name:"Dzso",
            age:32   
        }
    ]
};

function renderCar(){
    let carHTML="";

    for(let car of cars.auto){
        carHTML +=`
         <div class="card p-2 m-2" >
        <p>${car.name}</p>
        <p>${car.age}</p>
        </div>`

    }
    document.getElementById("car-box").innerHTML=carHTML
}
window.onload=renderCar;
*/


/**********BMI  

let bmi = 0;

document.getElementById("bmi-box").onsubmit=function(event){
    event.preventDefault();
    let weight = Number(event.target.elements.weight.value);
    let height = Number(event.target.elements.height.value);
    let bmi= Math.floor(weight/((height/100)**2));

    console.log(weight);
    console.log(height);
    console.log(bmi);

if(bmi>40){
    console.log( bmi + " dagadt vagy! ")
    document.getElementById("bmi-value").innerHTML = bmi + " dagadt vagy";

}
if(bmi<40 && bmi >26){
    console.log("fogynod kell")
    document.getElementById("bmi-value").innerHTML=bmi + " le kell fogynod";

}
if(bmi<26 && bmi>19){
    console.log("ok")
    document.getElementById("bmi-value").innerHTML=bmi + " Ok";
}
if(bmi<19){
    console.log("soványka vagy")
    document.getElementById("bmi-value").innerHTML=bmi + " Soványka vagy";
}
}

*/