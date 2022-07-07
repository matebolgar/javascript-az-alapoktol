/**
 * AJAX kérések
 *  
 * http://jsonplaceholder.typicode.com/posts
 */

document.getElementById('fetch-posts').onclick = () => {

  // új request objektum létrehozása
  var xhr = new XMLHttpRequest;

  // kérés állapot feldolgozása
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // kérés rendben lezajlott, lehet feldolgozni a kapott adatokat...
      var posts = JSON.parse(xhr.responseText);
      var postListHTML = '';

      // összerakjuk a postokat tartalmazó HTML-t
      for (const post of posts) {
        postListHTML += `<p>${post.title}</p><small>${post.body}</small>`;
      }

      // postok megjelenítése
      document.getElementById('post-list-container').innerHTML = postListHTML;
    }
  }

  // kérés megnyitása
  xhr.open('GET', 'http://jsonplaceholder.typicode.com/posts');

  // kérés elküldése
  xhr.send();
};