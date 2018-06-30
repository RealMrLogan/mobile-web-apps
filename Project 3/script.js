/*jshint esversion: 6 */
window.onload = function() {
  // mySpeciesList = JSON.parse(localStorage.getItem('speciesList'));
  // myPlanetsList = JSON.parse(localStorage.getItem('planetsList'));
  // if (!mySpeciesList) {
  //   console.log('getting speciesList');
  //   requestSpecies(1);
  // }
  // if (!myPlanetsList) {
  //   console.log('getting planetsList');
  //   requestPlanets(1);
  // }

  requestSpecies(1);
  requestPlanets(1);

  // console.log("The speciesList has stuff in it: ");
  // console.log(speciesList);
  // console.log("The planetsList has stuff in it: ");
  // console.log(planetsList);
  setTimeout(loadSpeciesDropdown, 3000); // since the HTTP request runs async, have this function wait for a second to load all the data
  setTimeout(loadPlanetsDropdown, 3000); // same thing as above
};

window.onunload = function() {
  console.log('closing the browser');
  localStorage.setItem('speciesList', JSON.stringify(speciesList));
  localStorage.setItem('planetsList', JSON.stringify(planestsList));
};

function requestSpecies(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  const req = new XMLHttpRequest();
  const URLhost = 'https://swapi.co/api/species/?page=' + pageNumber; // sets up to iterate through the pages
  req.open('GET', URLhost, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      const response = JSON.parse(req.responseText);
      for (let i = 0; i < response.results.length; i++) { // add each object to the list
        speciesList.push(response.results[i]);
      }
      if (response.next) {
        requestSpecies(pageNumber+1); // recursivly call the function with the new page
      }
    } else {
      console.log('Error in network request: ' + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function requestPlanets(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  const req = new XMLHttpRequest();
  const URLhost = 'https://swapi.co/api/planets/?page=' + pageNumber; // sets up to iterate through the pages
  req.open('GET', URLhost, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      const response = JSON.parse(req.responseText);
      for (let i = 0; i < response.results.length; i++) { // add each object to the list
        planetsList.push(response.results[i]);
      }
      if (response.next) {
        requestPlanets(pageNumber+1); // recursivly call the function with the new page
      }
    } else {
      console.log('Error in network request: ' + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function loadSpeciesDropdown() {
  console.log('organizing the Species');
  console.log(speciesList);
  // speciesList.sort(function(a, b){return speciesList[a].name - speciesList[b].name});
  console.log(speciesList);

  console.log('loading the dropdown');
  for (let i = 0; i < speciesList.length; i++) {
    let speciesName = document.createElement('option');
    speciesName.innerHTML = speciesList[i].name;
    document.getElementById('speciesDropdown').add(speciesName);
  }
}

function loadPlanetsDropdown() {
  console.log('loading the dropdown');
  for (let i = 0; i < planetsList.length; i++) {
    let planetsName = document.createElement('option');
    planetsName.innerHTML = planetsList[i].name;
    document.getElementById('planetsDropdown').add(planetsName);
  }
}

document.getElementById('startGame').onclick = function() { // initialize the game
  console.log("started the game");
  const name = document.getElementById('name').value;
  const speciesDropdown = document.getElementById('speciesDropdown');
  const planetsDropdown = document.getElementById('planetsDropdown');
  const species = speciesDropdown.options[speciesDropdown.selectedIndex].text;
  const planet = planetsDropdown.options[planetsDropdown.selectedIndex].text;
  const myPlayer = character(name, species, planet);
  console.log(`${myPlayer.getName()} ${myPlayer.getSpecies()} ${myPlayer.getPlanet()}`);
};

function welcome() {

}

// Global variables
const character = function (myName, mySpecies, myPlanet) {
  let hp = 10;
  let damage = 2;
  let speed = 5;
  let shield = 10;
  const name = myName;
  const species = mySpecies;
  const planet = myPlanet;
  return Object.create ({
    getHealth: () => hp,
    getDamage: () => damage,
    getSpeed: () => speed,
    getShield: () => shield,
    getName: () => name,
    getSpecies: () => species,
    getPlanet: () => planet,

    setHealth: (health) => {hp = health},
    setDamage: (dmg) => {damage = dmg},
    setSpeed: (speed) => {this.speed = speed},
    setShield: (shield) => {this.shield = shield}
  });
};
var speciesList = []; // the array to hold all the species
var planetsList = []; // the array to hold all the species
