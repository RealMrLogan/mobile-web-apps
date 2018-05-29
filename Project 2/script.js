/*jshint esversion: 6 */
window.addEventListener('load', function() {
});

function createMovie(movie) {
  let movieLi = document.createElement('li');

  let div = document.createElement('div');
  let poster = document.createElement('img');
  poster.src = movie.Poster;
  div.appendChild(poster);

  let div2 = document.createElement('div');
  let name = document.createElement('H2');
  name.innerHTML = `${movie.Title} (${movie.Year})`;
  let director = document.createElement('p');
  director.className = "director";
  director.innerHTML = `Directed by: <strong>${movie.Director}</strong>`;
  let rating = document.createElement('p');
  rating.className = "rated";
  rating.innerHTML = movie.Rated;
  let description = document.createElement('P');
  description.className = "plot";
  description.innerHTML = movie.Plot;
  div2.appendChild(name);
  div2.appendChild(director);
  div2.appendChild(rating);

  movieLi.appendChild(div);
  movieLi.appendChild(div2);
  movieLi.appendChild(document.createElement('br'));
  movieLi.appendChild(description);

  return movieLi;
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
