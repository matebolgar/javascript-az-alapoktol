"use strict";

/**
 * AJAX kérések III.
 * 
 * PROMISE
 *  
 * http://jsonplaceholder.typicode.com/posts
 */

/**
 * 
 * Probléma: Egymásba fűzött requestek, átláthatatlan kód (callback hell vagy pyramid of doom):
 * 
 * sendRequest(url, 'POST', body, function (token) {
 *    if (token) {
 *      sendRequest('https://reqres.in/api/users', 'GET', null, function (users) {
 *        if (users) {
 *          sendRequest('https://reqres.in/api/tovabbiEroforras1', 'GET', null, function (eroforras1) {
 *            if (eroforras1) {
 *              sendRequest('https://reqres.in/api/tovabbiEroforras2', 'GET', null, function (eroforras2) {
 *                if (eroforras2) {
 *                  console.log(eroforras2)
 *                } else {
 *                  alert('Error');
 *                }
 *              )};
 *            } else {
 *              alert('Error');
 *            }
 *          )};
 *        } else {
 *          alert('Error');
 *        }
 *      )};
 *    } else {
 *      alert('Error');
 *    }
 *  });
 * 
 * 
 */
document.getElementById('login').onclick = function () {
  var url = 'https://reqres.in/api/login'; // példa, beégetett adatokkal...ezt be is lehet majd kérni egy form-ról!! (HF)

  var body = JSON.stringify({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  }); // Promise-al (Promise chain)

  sendRequest2(url, 'POST', body).then(function (response) {
    console.log(response); // return "teszt";  // .then ilyenkor becsomagolja egy síma Promise-ba és visszaadja az értéket: "teszt"
    // ha egy újabb kéréssel térünk vissza akkor nem lesz dupla Promise!
    // ilyenkor a .then levágja az első réteg Promise-t és a kérés "eredményét" egy síma Promise-ban adja vissza a 
    // következő .then -nek

    return sendRequest2('https://reqres.in/api/users', 'GET', null);
  }).then(function (jovobeliErtek) {
    console.log(jovobeliErtek); // ha van vmi hiba akkor így lehet ugrani egyből a .catch ágra 
    // return Promise.reject('Hiba oka...');
  })["catch"](function (error) {
    // hibakezelés: Promise-ban a reject-el elküldött hiba!
    // .then -ben bárhol elhelyezhető, így minden egyes kérést le lehet kezelni. A való életben általában
    // csak a .then-blokkok végén található a catch és az egyes .then blokkokból egy reject('vmi') -vel lépnek
    // ki és az egyből a .catch ágra ugrik!!
    console.log(error);
  });
}; // Promise (ígéret)


function sendRequest2(url, method, body) {
  // visszatérés egy új Promise-al
  return new Promise(function (resolve, reject) {
    // új request objektum létrehozása
    var xhr = new XMLHttpRequest(); // kérés állapot feldolgozása

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          //reject(xhr.responseText);
          reject('Promise error: Szerver felöli kérés sikertelen!');
        }
      }
    }; // sorrend fontos!!!! Előbb meg kell nyitni majd csak utána lehet a header elküldeni!!
    // kérés megnyitása


    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json'); // kérés elküldése

    xhr.send(body);
  });
}