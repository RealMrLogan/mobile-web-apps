/*jshint esversion: 6 */
window.onload = function() {
  requestSpecies(1);
  loadSpeciesDropdown();
  console.log(speciesList);
};

function requestSpecies(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  const req = new XMLHttpRequest();
  const URLhost = 'https://swapi.co/api/species/?page=' + pageNumber; // sets up to iterate through the pages
  req.open('GET', URLhost, false);
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

function loadSpeciesDropdown() {
  for (let i = 0; i < speciesList.length; i++) {
    let speciesName = document.createElement('option').innerHTML = speciesList[1].name;
    document.getElementById('speciesDropdown').appendChild(speciesName);
  }
}

document.getElementById('startGame').onclick = function() { // initialize the game
  console.log("started the game");
  const name = document.getElementById('name').value;
  const myPlayer = character(name, species);
  console.dir(myPlayer);
  console.log(`${myPlayer.getName()} ${myPlayer.getSpecies()}`);
};

// Global variables
const character = function (myName, mySpecies) {
  let hp = 10;
  let damage = 2;
  let speed = 5;
  let shield = 10;
  const name = myName;
  const species = mySpecies;
  return Object.create ({
    getHealth: () => hp,
    getDamage: () => damage,
    getSpeed: () => speed,
    getShield: () => shield,
    getName: () => name,
    getSpecies: () => species,

    setHealth: (health) => {hp = health},
    setDamage: (dmg) => {damage = dmg},
    setSpeed: (speed) => {this.speed = speed},
    setShield: (shield) => {this.shield = shield}
  });
};
var speciesList = []; // the array to hold all the species
