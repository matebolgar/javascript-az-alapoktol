"use strict";

/*
    Login url: https://reqres.in/api/login
    Body:
    {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }

    Users url: https://reqres.in/api/users
*/

/*
    Feladatok:
    1. Ha a bejelentkezés sikeres, tünjön el a form (lehet akár a state-ben tárolni az állapotot)     -OK
    2. Message doboz használata - spinner a kérés alatt pl...                                         -OK
    3. Amíg a bejelentkezés folyamatban van, az inputmezők + submit gomb disabled-re vannak állítva   -OK
*/
var state = [{
  bShowSpinner: false,
  userList: []
}];

document.getElementById('login').onsubmit = function (event) {
  // alap HTML form küldés letiltása
  event.preventDefault(); // spinner megjelenítése és inputok és gomb letiltása

  state.bShowSpinner = true;
  updateForm(); // login adatok bekérése a formról

  var email = event.target.elements.email.value;
  var password = event.target.elements.password.value;
  var body = JSON.stringify({
    email: email,
    password: password
  });
  var loginURL = "https://reqres.in/api/login";
  var usersURL = "https://reqres.in/api/users";
  fetch(loginURL, {
    method: "POST",
    body: body,
    headers: {
      'content-type': 'application/json'
    }
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject('Bejelentkezés sikertelen!');
    }

    return response.json();
  }).then(function (response) {
    return fetch(usersURL);
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject('Felhasználó lista lekérés sikertelen!');
    }

    return response.json();
  }).then(function (userPage) {
    // state change - megérkezett a user lista
    state.userList = userPage.data; // render

    renderUsers(); // spinner elrejtése és inputok és gomb engedélyezése

    state.bShowSpinner = false;
    updateForm();
  })["catch"](function (error) {
    alert(error);
  });

  function renderUsers() {
    // form elrejtése
    //document.getElementById('full-login-form').style.display = "none";
    var usersHTML = '<ul class="list-group>">';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = state.userList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var user = _step.value;
        usersHTML += "<li  class=\"list-group-item\">".concat(user.first_name, " ").concat(user.last_name, "</li>");
      }
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

    usersHTML += "</ul>";
    document.getElementById('user-list-container').innerHTML = usersHTML;
  }

  function updateForm() {
    // spinner megjelenítése vagy elrejtése az állapottól függően
    if (state.bShowSpinner) {
      // spinner megjelenítése
      document.getElementById('message').classList.remove('d-none');
    } else {
      // spinner elrejt
      document.getElementById('message').classList.add('d-none');
    } // inputok és gomb letiltása


    document.getElementById('email').disabled = state.bShowSpinner;
    document.getElementById('password').disabled = state.bShowSpinner;
    document.getElementById('submit').disabled = state.bShowSpinner;
  }
  /*
  // belépés megkisérlése (hagyományos Promise-al!!)
  sendRequest(loginURL, 'POST', body)
    .then((resolve) => {
      // login ok, megvan a token, le kell kérni user listát és továbbadni a 
      // következő .then ágnak!
      return sendRequest(usersURL, 'GET', null)
    })    
    .then((resolve) => {
      // console.log(resolve.data);
      // megvan a userlista, össze kell rakni a html-t:
      var usersHTML = '<ul class="list-group>">';
      for (const user of resolve.data) {
        usersHTML += `<li  class="list-group-item">${user.first_name} ${user.last_name}</li>`;
      }
      usersHTML += "</ul>";
      document.getElementById('user-list-container').innerHTML = usersHTML;
    })
     .catch((err) => {
      console.log(err.data);
    });
  */

};

function sendRequest(url, method, body) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          // kérés vmiért nem sikerült
          reject({
            data: 404
          });
        }
      }
    }; // sorrend fontos!!!! Előbb meg kell nyitni majd csak utána lehet a header elküldeni!!
    // kérés megnyitása


    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json'); // kérés elküldése

    xhr.send(body);
  });
}