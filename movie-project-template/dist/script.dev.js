"use strict";

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
var state = {
  movieList: []
};

document.getElementById('search').onsubmit = function (event) {
  // HTML küldés letiltása
  event.preventDefault();
  var sTitle = event.target.elements.search.value;
  var iYear = Number(event.target.elements.year.value);

  if (sTitle === '') {
    alert('Keresőszó kitöltése kötelező!');
    return;
  }

  sTitle = encodeURI(sTitle); // filmlista lekérése

  getMovies(sTitle, iYear);
};

function getMovies(sTitle, iYear) {
  var sUrl, moviesResponse, mlist;
  return regeneratorRuntime.async(function getMovies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // "aszinkron" lekérjük a filmlistát (ha van)
          // illetve ha van megadva év akkor azt is hozzáfűzzük a linkhez
          sUrl = "http://www.omdbapi.com/?s=".concat(sTitle).concat(iYear > 0 ? '&y=' + iYear : '', "&apiKey=9606ae0f");
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(sUrl));

        case 3:
          moviesResponse = _context.sent;

          if (moviesResponse.ok) {
            _context.next = 7;
            break;
          }

          alert('API kapcsolódási hiba!');
          return _context.abrupt("return");

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(moviesResponse.json());

        case 9:
          mlist = _context.sent;

          if (mlist.Search) {
            _context.next = 13;
            break;
          }

          alert('Nincs ilyen film!');
          return _context.abrupt("return");

        case 13:
          // megvan(nak) a film(ek) mehet(nek) a state.movieList -be
          state.movieList = mlist.Search; //console.log(state.movieList[0].Title);

          renderMovies();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderMovies() {
  // filmlista megrejzolása
  var movieListHTML = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.movieList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var movie = _step.value;
      movieListHTML += "\n            <li>\n                <div class=\"poster-wrap\">\n                    <a>\n                    <img src=\"".concat(movie.Poster, "\" class=\"movie-poster\" />\n                    </a>\n                </div>\n                <p data-imdbid=\"").concat(movie.imdbID, "\" class=\"single-movie-btn\">\n                    <span class=\"movie-title\">\n                        <a href=\"#\" onclick=\"showMoveInfo('").concat(movie.imdbID, "');\">").concat(movie.Title, "</a>                    \n                    </span>\n                </p>\n                <span class=\"movie-year\">\n                    ").concat(movie.Year, "\n                </span>\n            </li>\n        ");
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

  document.getElementById('movies').innerHTML = movieListHTML;
}

function showMoveInfo(moveId) {
  var sUrl, moviesResponse, mlist;
  return regeneratorRuntime.async(function showMoveInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          /* - Címre kattintva az adott id-jú film kapcsán küldj ki AJAX kérést GET methoddal a
                http://www.omdbapi.com/?i={Egyedi azonosító (imdbID)}&apiKey=9606ae0f URL-re
              - A szerver válaszát jelenítsd meg a felhasználónak */
          // alert(moveId);
          // "aszinkron" lekérjük a kiválasztott film adatait
          sUrl = "http://www.omdbapi.com/?i=".concat(moveId, "&apiKey=9606ae0f");
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(sUrl));

        case 3:
          moviesResponse = _context2.sent;

          if (moviesResponse.ok) {
            _context2.next = 7;
            break;
          }

          alert('API kapcsolódási hiba!');
          return _context2.abrupt("return");

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(moviesResponse.json());

        case 9:
          mlist = _context2.sent;
          // pár infó a kiválasztott filmről:
          console.log('Szereplők: ' + mlist.Actors);
          console.log('Nyelv: ' + mlist.Language);
          console.log('Pontszám: ' + mlist.imdbRating);
          return _context2.abrupt("return");

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}