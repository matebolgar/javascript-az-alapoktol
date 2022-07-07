// if / else statement

var age = prompt("Életkorod?");

// if (age < 20) {
//     alert("Fiatalabb mint 20!");
// } else {
//     alert("Idősebb mint 20!");
// }


// switch

switch (age) {
    case "18":
        console.log("Felhasználó 18 éves");
        break;

    default:
        break;
}

switch (true) {
    case age < 20:
        alert("Fiatalabb mint 20!");
        break;
    
    default:
        alert("Idősebb mint 20!");
        break
}