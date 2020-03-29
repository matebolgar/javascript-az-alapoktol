/*
 * AJAX kérések
 * Asynchronous JavaScript and XML
 */

document.getElementById("login").onclick = function() {
  var url = 'https://reqres.in/api/login';
  var body = JSON.stringify({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  })

  /*
  // callback hell / pyramid of doom
  sendRequest(url, 'POST', body, function (token) {
    if(token) {
        sendRequest('https://reqres.in/api/users', 'GET', null, function (users) {
            if(users) {
              sendRequest('https://reqres.in/api/tovabbiEroforras1', 'GET', null, function (eroforras1) {
                  if(eroforras1) {
                    sendRequest('https://reqres.in/api/tovabbiEroforras2', 'GET', null, function (eroforras2) {
                        if(eroforras2) {
                          console.log(eroforras2);
                        } else {
                          alert('Error');      
                        }
                    });
                  } else {
                    alert('Error');
                  }
              })
            } else {
              alert('Error');
            }
        })
      } else {
        alert('Error');
      }
  })
  */


  // Promise chain

  // fetch
  sendRequest2(url, 'POST', body)
    // Promise<string>
    // Promise<any>
    .then(function(response) {
      console.log(response);
      // return "teszt";
      return sendRequest2('https://reqres.in/api/users', 'GET', null);
    })
    .then(function(jovobeliErtek) {
      console.log(jovobeliErtek);
      return Promise.reject('Hiba oka');
      // return sendRequest2('https://reqres.in/tovabbiEroforras1', 'GET', null);
    })
    .then(function (jovobeliErtek) {
      console.log(jovobeliErtek);
    })
    .catch(function(error) {
      console.log(error);
    })
};


function sendRequest(url, method, body, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(body);
}

// Promise<_>

function sendRequest2(url, method, body) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if(xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };
      xhr.open(method, url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(body);
    });
}






























