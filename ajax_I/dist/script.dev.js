"use strict";

/**
 * AJAX kérések
 *  
 * http://jsonplaceholder.typicode.com/posts
 */
document.getElementById('fetch-posts').onclick = function () {
  // új request objektum létrehozása
  var xhr = new XMLHttpRequest(); // kérés állapot feldolgozása

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // kérés rendben lezajlott, lehet feldolgozni a kapott adatokat...
      var posts = JSON.parse(xhr.responseText);
      var postListHTML = ''; // összerakjuk a postokat tartalmazó HTML-t

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var post = _step.value;
          postListHTML += "<p>".concat(post.title, "</p><small>").concat(post.body, "</small>");
        } // postok megjelenítése

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

      document.getElementById('post-list-container').innerHTML = postListHTML;
    }
  }; // kérés megnyitása


  xhr.open('GET', 'http://jsonplaceholder.typicode.com/posts'); // kérés elküldése

  xhr.send();
};