/*jshint esversion: 6 */

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

document.getElementById('getPreview').onclick = function() {
  // When the user clicks the button, open the modal and blur the background
  const main = document.getElementById('myMain');
  modal.style.display = "block";
  myMain.className = "blur";

  let title = document.getElementById('input');
  let movieTitle = title.value;
  title.value = "";
  let myMovieTitle = encodeURI(movieTitle);
  const myOptionsDiv = document.getElementById('myOptionsDiv');
  const borders = document.getElementsByClassName('border');

  $.getJSON("https://www.omdbapi.com/?apikey=fcef2b9e&t="+myMovieTitle, function(result){
    const newMovie = document.getElementById('myModalContent');
    const confirmText = document.getElementById('confirmText');
    if (result.Error) {
      newMovie.innerHTML = "<p class='listTitleText' >Movie Not Found</p>";
      myOptionsDiv.style.display = "none";
      confirmText.style.display = "none";
      borders[0].style.display = "none";
      borders[1].style.display = "none";
      return;
    }
    newMovie.innerHTML = createMovie(result).outerHTML;

    document.getElementById('yesButton').onclick = function() {
       modal.style.display = "none";
       sortMovie(newMovie.children[0]);
     };
    document.getElementById('noButton').onclick = function() {
        modal.style.display = "none";
        myMain.className = "";
    };
  });

  myOptionsDiv.style.display = "block";
  confirmText.style.display = "block";
  borders[0].style.display = "block";
  borders[1].style.display = "block";
};

function sortMovie(newMovie) {
  const sortOptions = document.getElementById('sortSection');
  sortOptions.style.display = "block";
  const like = document.getElementById('likedButton');
  const meh = document.getElementById('mehButton');
  const hate = document.getElementById('hatedButton');

  like.onclick = function() {
    document.getElementById('likedMovieList').appendChild(newMovie);
    document.getElementById('sortSection').style.display = "none";
    myMain.className = "";
  };
  meh.onclick = function() {
    document.getElementById('mehMovieList').appendChild(newMovie);
    document.getElementById('sortSection').style.display = "none";
    myMain.className = "";
  };
  hate.onclick = function() {
    document.getElementById('hatedMovieList').appendChild(newMovie);
    document.getElementById('sortSection').style.display = "none";
    myMain.className = "";
  };
}

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
// console.dir(document.getElementById('myMovieLists'));
window.onunload = function() {
  console.log("Window closed");
  // const myMovieLists = document.getElementById('myMovieLists');
  localStorage.setItem('myMovieLists', JSON.stringify(document.getElementById('myMovieLists').outerHTML));
  console.dir(document.getElementById('myMovieLists'));
};

window.onload = function() {
  console.log("Window loaded");
  // document.getElementById('myMovieLists').innerHTML = JSON.parse(localStorage.getItem('myMovieLists'));
  // console.dir(myMovieLists);
};
