/*
    Feladat:

    1.

        - Form submit eseményre szedd ki az input mezőkben lévő értékeket

        - Ha a keresőszó üres, dobj fel alert dobozt "Keresőszó kitöltése kötelező" felirattal

        - Ha van keresőszó, akkor encodeURI() beépített function-nel alakítsd át URL kompatibilis formára

        - Küldj AJAX kérést GET methoddal a 
          http://www.omdbapi.com/?s={keresőszó}&y={évszám}&apiKey=9606ae0f URL-re

        - A válaszként kapott filmeket rendereld ki a "movies" id-jú element belsejébe,
           az alábbi template alapján:

            <li>
              <div class="poster-wrap">
                <a>
                  <img src="{Borítókép (Poster)}" class="movie-poster" />
                </a>
              </div>
              <p data-imdbid="{Egyedi azonosító (imdbID)}" class="single-movie-btn">
                <span class="movie-title">
                  {Cím (Title)}
                </span>
              </p>
              <span class="movie-year">
                {Évszám (Year)}
              </span>
            </li>

    2.
        - Címre kattintva az adott id-jú film kapcsán küldj ki AJAX kérést GET methoddal a
          http://www.omdbapi.com/?i={Egyedi azonosító (imdbID)}&apiKey=9606ae0f URL-re

        - A szerver válaszát jelenítsd meg a felhasználónak


*/


document.getElementById('search').onsubmit = async function (event) {
  event.preventDefault();
  var searchWord = event.target.elements.search.value;
  var year = event.target.elements.year.value;

  if(!searchWord) {
    alert('Keresőmező kitöltése kötelező');
    return;
  }

  var url = `http://www.omdbapi.com/?s=${encodeURI(searchWord)}&y=${year}&apiKey=9606ae0f`

  var response = await fetch(url);
  if(!response.ok) {
    alert('Keresés sikertelen');
    return;
  }

  var movieResponse = await response.json();

  if(!movieResponse.Search) {
    alert('Keresés sikertelen');
    return;
  }

  renderMovieList(movieResponse.Search);
}

function renderMovieList(movies) {
  var movieListTemplate = '';
  for(var movie of movies) {
    movieListTemplate = movieListTemplate + `
        <li>
          <div class="poster-wrap">
            <a>
              <img src="${movie.Poster}" class="movie-poster" />
            </a>
          </div>
          <p data-imdbid="${movie.imdbID}" class="single-movie-btn">
            <span class="movie-title">
              ${movie.Title}
            </span>
          </p>
          <span class="movie-year">
            ${movie.Year}
          </span>
        </li>
    `
  }

  document.getElementById('movies').innerHTML = movieListTemplate;

  var movieTitles = document.querySelectorAll('.single-movie-btn');

  for(var movieTitle of movieTitles) {
    movieTitle.onclick = function (event) {
      var url = `http://www.omdbapi.com/?i=${event.target.parentElement.dataset.imdbid}&apiKey=9606ae0f`

      fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (singleMovie) {
            console.log(singleMovie);
            document.getElementById('movie-description').innerHTML = `
              <h1>${singleMovie.Title}</h1>
              <p>${singleMovie.Plot}</p>
            `;
        })
      
    }
  }
}
