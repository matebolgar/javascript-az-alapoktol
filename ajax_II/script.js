/**
 * AJAX kérések II.
 *  
 * http://jsonplaceholder.typicode.com/posts
 */

document.getElementById('login').onclick = () => {

  var url = 'https://reqres.in/api/login';

  // példa, beégetett adatokkal...ezt be is lehet majd kérni egy form-ról!! (HF)
  var body = JSON.stringify({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  });

  sendRequest(url, 'POST', body, function (token) {
    // console.log(token);
    sendRequest('https://reqres.in/api/users', 'GET', null, function (users) {
      console.log(users);
    });
  });
  
};

function sendRequest(url, method, body, callback) {
  // új request objektum létrehozása
  var xhr = new XMLHttpRequest;
  // kérés állapot feldolgozása
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // kérés rendben lezajlott, lehet feldolgozni a kapott adatokat...
      callback(JSON.parse(xhr.responseText));
    }
  };
  // sorrend fontos!!!! Előbb meg kell nyitni majd csak utána lehet a header elküldeni!!
  // kérés megnyitása
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  // kérés elküldése
  xhr.send(body);
}