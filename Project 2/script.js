/*jshint esversion: 6 */

function addModalStuff() {

}
function createMovie(movie) {
  let li = document.createElement('li');
  li.appendChild(createTitle(movie.Title, movie.Year));
  let section = document.createElement('section');
  section.className = "container";
  section.appendChild(createImg(movie.Poster));
  section.appendChild(createDirector(movie.Director));
  section.appendChild(createRated(movie.Rated));
  section.appendChild(createReleaseDate(movie.Released));
  section.appendChild(createActors(movie.Actors));
  section.appendChild(createPlot(movie.Plot));
  li.appendChild(section);
  return li;
}

function createTitle(title, year) {
  let div = document.createElement('div');
  div.className = 'titleDiv';
  let myTitle = document.createElement('h2');
  myTitle.innerHTML = `${title} (${year})`;
  div.appendChild(myTitle);
  return div;
}

function createImg(poster) {
  let myPoster = document.createElement('img');
  myPoster.src = poster;
  return myPoster;
}

function createDirector(str) {
  let director = document.createElement('p');
  director.className = "director";
  director.innerHTML = `Directed by: <strong>${str}</strong>`;
  return director;
}

function createRated(rated) {
  let rating = document.createElement('p');
  rating.className = "rated";
  rating.innerHTML = `Rated: ${rated}`;
  return rating;
}

function createReleaseDate(date) {
  let releaseDate = document.createElement('p');
  releaseDate.className = "releaseDate";
  releaseDate.innerHTML = `Released on: ${date}`;
  return releaseDate;
}

function createActors(actors) {
  let myActors = document.createElement('p');
  myActors.className = "actors";
  myActors.innerHTML = `Actors: ${actors}`;
  return myActors;
}

function createPlot(plot) {
  let myPlot = document.createElement('P');
  myPlot.className = "plot";
  myPlot.innerHTML = plot;
  return myPlot;
}

const btn = document.getElementById('getPreview');
btn.onclick = function() {
  // When the user clicks the button, open the modal and blur the background
  const main = document.getElementById('myMain');
  modal.style.display = "block";
  myMain.className = "main";
  let listOfMovies = document.getElementById('movieList');

  let movieTitle = document.getElementById('input').value;
  let myMovieTitle = encodeURI(movieTitle);
  $.getJSON("http://www.omdbapi.com/?apikey=fcef2b9e&t="+myMovieTitle, function(result){
      console.dir(result);
      if (result.Error) { console.log(result.Error); return; }
      document.getElementById('myModalContent').innerHTML = createMovie(result).outerHTML;
      // listOfMovies.appendChild(createMovie(result));
  });

  const yes = document.getElementById('yesButton');
  const no = document.getElementById('noButton');
};

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    myMain.className = "";
};

// Get the modal
const modal = document.getElementById('myModal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        myMain.className = "";
    }
};
