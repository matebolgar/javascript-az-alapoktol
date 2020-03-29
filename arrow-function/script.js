/*
 * Arrow function
 */

/*
var addOne = function (szam) {
    return szam + 1;
}
*/

var addOne = szam => szam + 1;

console.log(addOne(1));


fetch("https://reqres.in/api/users")
  .then(response => response.json())
  .then(page => page.data[0])
  .then(user => {
    const name = `${user.first_name} ${user.last_name}`;
    return name;
  })
  .then(name => ({userName: name}))
  .then((content) => {
    console.log(content);
  });

  var vegeredmeny = [3, 4, 5, 2, 34, 5, 2]
    .filter(szam => szam % 2 === 0)
    .map(szam => szam / 2)
    .reduce((acc, cr) => acc + cr)

    console.log(vegeredmeny);
    






