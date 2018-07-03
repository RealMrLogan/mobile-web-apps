/*jshint esversion: 6 */
window.onload = function() {
  const modal = document.getElementById('myModal');
  const charCreation = document.getElementById('charCreation');
  modal.style.display = "block";
  charCreation.className = "blur";

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

  requestSpecies(1); // TODO: set as a promise
  requestPlanets(1);
  requestVehicles(1);

  // console.log("The speciesList has stuff in it: ");
  // console.log(speciesList);
  // console.log("The planetsList has stuff in it: ");
  // console.log(planetsList);
  setTimeout(loadSpeciesDropdown, 3000); // since the HTTP request runs async, have this function wait for a second to load all the data
  setTimeout(loadPlanetsDropdown, 3000); // same thing as above
  setTimeout(loadVehiclesDropdown, 3000); // same thing as above

  // request({url: 'https://swapi.co/api/species/?page=1'})
  //   .then(data => {
  //     // add the responses to the variable
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  //after the content is loaded
  // modal.style.display = "none";
  // charCreation.className = "";
};

// window.onunload = function() {
//   console.log('closing the browser');
//   localStorage.setItem('speciesList', JSON.stringify(speciesList));
//   localStorage.setItem('planetsList', JSON.stringify(planestsList));
// };

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

let request = obj => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    // const URLhost = 'https://swapi.co/api/species/?page=' + pageNumber; // sets up to iterate through the pages
    req.open(obj.method || 'GET', obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach(key => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
    // req.addEventListener('load',function(){
    //   if(req.status >= 200 && req.status < 400){
    //     const response = JSON.parse(req.responseText);
    //     for (let i = 0; i < response.results.length; i++) { // add each object to the list
    //       speciesList.push(response.results[i]);
    //     }
    //     if (response.next) {
    //       requestSpecies(pageNumber+1); // recursivly call the function with the new page
    //     }
    //   } else {
    //     console.log('Error in network request: ' + req.statusText);
    //   }
    // });
    // req.send(null);
    // event.preventDefault();
  });
};

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

function requestVehicles(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  const req = new XMLHttpRequest();
  const URLhost = 'https://swapi.co/api/vehicles/?page=' + pageNumber; // sets up to iterate through the pages
  req.open('GET', URLhost, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      const response = JSON.parse(req.responseText);
      for (let i = 0; i < response.results.length; i++) { // add each object to the list
        vehiclesList.push(response.results[i]);
      }
      if (response.next) {
        requestVehicles(pageNumber+1); // recursivly call the function with the new page
      }
    } else {
      console.log('Error in network request: ' + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function loadSpeciesDropdown() {
  // console.log('organizing the Species');
  // console.log(speciesList);
  // // speciesList.sort(function(a, b){return speciesList[a].name - speciesList[b].name});
  // console.log(speciesList);

  console.log('loading the species dropdown');
  for (let i = 0; i < speciesList.length; i++) {
    let speciesName = document.createElement('option');
    speciesName.innerHTML = speciesList[i].name;
    document.getElementById('speciesDropdown').add(speciesName);
  }
}

function loadPlanetsDropdown() {
  console.log('loading the plantes dropdown');
  for (let i = 0; i < planetsList.length; i++) {
    let planetsName = document.createElement('option');
    planetsName.innerHTML = planetsList[i].name;
    document.getElementById('planetsDropdown').add(planetsName);
  }
}

function loadVehiclesDropdown() {
  console.log('loading the vehicles dropdown');
  for (let i = 0; i < vehiclesList.length; i++) {
    let vehiclesName = document.createElement('option');
    vehiclesName.innerHTML = vehiclesList[i].name;
    document.getElementById('vehiclesDropdown').add(vehiclesName);
  }
}

document.getElementById('startGame').onclick = function() { // initialize the game
  console.log("started the game");
  const name = document.getElementById('name').value;
  const speciesDropdown = document.getElementById('speciesDropdown');
  const planetsDropdown = document.getElementById('planetsDropdown');
  const species = speciesDropdown.options[speciesDropdown.selectedIndex].text;
  const planet = planetsDropdown.options[planetsDropdown.selectedIndex].text;
  const vehicle = vehiclesDropdown.options[vehiclesDropdown.selectedIndex].text;
  const myPlayer = character(name, species, planet, vehicle);
  console.log(`
    Name: ${myPlayer.getName()}
    Species: ${myPlayer.getSpecies()}
    Planet: ${myPlayer.getPlanet()}
    Vehicle: ${myPlayer.getVehicle()}`
  );
};

function welcome() {

}

// Global variables
const character = function (myName, mySpecies, myPlanet, myVehicle) {
  let hp = 10;
  let damage = 2;
  let speed = 5;
  let shield = 10;
  const name = myName;
  const species = mySpecies;
  const planet = myPlanet;
  const vehicle = myVehicle;
  return Object.create ({
    getHealth: () => hp,
    getDamage: () => damage,
    getSpeed: () => speed,
    getShield: () => shield,
    getName: () => name,
    getSpecies: () => species,
    getPlanet: () => planet,
    getVehicle: () => vehicle,

    setHealth: (health) => {hp = health;},
    setDamage: (dmg) => {damage = dmg;},
    setSpeed: (speed) => {this.speed = speed;},
    setShield: (shield) => {this.shield = shield;}
  });
};
var speciesList = []; // the array to hold all the species
var planetsList = []; // the array to hold all the planets
var vehiclesList = []; // the array to hold all the vehicles
