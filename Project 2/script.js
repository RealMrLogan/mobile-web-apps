/*jshint esversion: 6 */
window.addEventListener('load', function() {
});

function createMovie(movie) {
  let movieDiv = document.createElement('li');

  let poster = document.createElement('img');
  poster.src = movie.Poster;
  let name = document.createElement('H2');
  name.innerHTML = movie.Title;
  let rating = document.createElement('H3');
  rating.innerHTML = movie.Rated;
  let description = document.createElement('P');
  description.innerHTML = movie.Plot;

  movieDiv.appendChild(poster);
  movieDiv.appendChild(name);
  movieDiv.appendChild(rating);
  movieDiv.appendChild(description);

  return movieDiv;
}

$("button").click(function(){
  let listOfMovies = document.getElementById('movieList');

  let movieTitle = document.getElementById('input').value;
  let myMovieTitle = encodeURI(movieTitle);
  console.log(myMovieTitle);
  $.getJSON("http://www.omdbapi.com/?apikey=fcef2b9e&t="+myMovieTitle, function(result){
      console.dir(result);
      if (result.Error) { console.log(result.Error); return; }
      listOfMovies.appendChild(createMovie(result));
  });
});
