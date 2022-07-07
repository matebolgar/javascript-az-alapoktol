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

var state = ({
    movieList: []
})


document.getElementById('search').onsubmit = (event) => {
    // HTML küldés letiltása
    event.preventDefault();

    var sTitle = event.target.elements.search.value;
    var iYear = Number(event.target.elements.year.value);

    if (sTitle === '') {
        alert('Keresőszó kitöltése kötelező!');
        return;
    }

    sTitle = encodeURI(sTitle);

    // filmlista lekérése
    getMovies(sTitle, iYear);
    
}

async function getMovies(sTitle, iYear) {
    // "aszinkron" lekérjük a filmlistát (ha van)
    // illetve ha van megadva év akkor azt is hozzáfűzzük a linkhez
    var sUrl = `http://www.omdbapi.com/?s=${sTitle}${iYear > 0 ? '&y=' + iYear : ''}&apiKey=9606ae0f`;
    var moviesResponse = await fetch(sUrl);

    // api kapcsolat oké?
    if (!moviesResponse.ok) {
        alert('API kapcsolódási hiba!');
        return;
    }

    var mlist = await moviesResponse.json()
    // van ilyen film?
    if (!mlist.Search) {
        alert('Nincs ilyen film!');
        return;
    }

    // megvan(nak) a film(ek) mehet(nek) a state.movieList -be
    state.movieList = mlist.Search;

    //console.log(state.movieList[0].Title);
    renderMovies();

}

function renderMovies() {
    // filmlista megrejzolása
    var movieListHTML = '';

    for (const movie of state.movieList) {
        movieListHTML += `
            <li>
                <div class="poster-wrap">
                    <a>
                    <img src="${movie.Poster}" class="movie-poster" />
                    </a>
                </div>
                <p data-imdbid="${movie.imdbID}" class="single-movie-btn">
                    <span class="movie-title">
                        <a href="#" onclick="showMoveInfo('${movie.imdbID}');">${movie.Title}</a>                    
                    </span>
                </p>
                <span class="movie-year">
                    ${movie.Year}
                </span>
            </li>
        `;
    }

    document.getElementById('movies').innerHTML = movieListHTML;

}

async function showMoveInfo(moveId) {
    /* - Címre kattintva az adott id-jú film kapcsán küldj ki AJAX kérést GET methoddal a
          http://www.omdbapi.com/?i={Egyedi azonosító (imdbID)}&apiKey=9606ae0f URL-re
        - A szerver válaszát jelenítsd meg a felhasználónak */
    // alert(moveId);

    // "aszinkron" lekérjük a kiválasztott film adatait
    var sUrl = `http://www.omdbapi.com/?i=${moveId}&apiKey=9606ae0f`;
    var moviesResponse = await fetch(sUrl);

    // api kapcsolat oké?
    if (!moviesResponse.ok) {
        alert('API kapcsolódási hiba!');
        return;
    }

    var mlist = await moviesResponse.json()
    
    // pár infó a kiválasztott filmről:
    console.log('Szereplők: ' + mlist.Actors);
    console.log('Nyelv: ' + mlist.Language);
    console.log('Pontszám: ' + mlist.imdbRating)
    return;

    

}