/*jshint esversion: 6 */
window.onload = function() {
  const modal = document.getElementById('myModal');
  const charCreation = document.getElementById('charCreation');
  modal.style.display = "block";
  charCreation.className = "blur";

  //temporary timeout to simulate loading speed
  setTimeout(function() {
    modal.style.display = "none";
    charCreation.className = "";
  }, 5000);

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

  // const speciesPromise = new Promise( (loadSpeciesDropdown, reject) => {
  //   console.log("inside the promise");
  //   requestSpecies(1);
  //   // console.log('requested');
  //   // console.log(speciesList);
  //   resolve("Success!");
  //   if (success) {
  //     resolve();
  //   } else {
  //     reject();
  //   }
  // });
  // speciesPromise.then((successMessage) => {
  //   console.log('inside promise.then');
  //   loadSpeciesDropdown();
  // });

  requestSpecies(1); // TODO: set as a promise
  requestPlanets(1);
  requestVehicles(1);

  setTimeout(loadSpeciesDropdown, 5000); // since the HTTP request runs async, have this function wait for a second to load all the data
  setTimeout(loadPlanetsDropdown, 5000); // same thing as above
  setTimeout(loadVehiclesDropdown, 5000); // same thing as above

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
  populateMessageOptions();
};

function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

// window.onunload = function() {
//   console.log('closing the browser');
//   localStorage.setItem('speciesList', JSON.stringify(speciesList));
//   localStorage.setItem('planetsList', JSON.stringify(planestsList));
// };

function requestSpecies(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  console.log('requesting the species page '+pageNumber);
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
      } else {
        console.log('All done requesting species');
      }
    } else {
      console.log('Error in network request: ' + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

// let request = obj => {
//   return new Promise((resolve, reject) => {
//     const req = new XMLHttpRequest();
//     // const URLhost = 'https://swapi.co/api/species/?page=' + pageNumber; // sets up to iterate through the pages
//     req.open(obj.method || 'GET', obj.url);
//     if (obj.headers) {
//       Object.keys(obj.headers).forEach(key => {
//         xhr.setRequestHeader(key, obj.headers[key]);
//       });
//     }
//     xhr.onload = () => {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         resolve(xhr.response);
//       } else {
//         reject(xhr.statusText);
//       }
//     };
//     xhr.onerror = () => reject(xhr.statusText);
//     xhr.send(obj.body);
//     // req.addEventListener('load',function(){
//     //   if(req.status >= 200 && req.status < 400){
//     //     const response = JSON.parse(req.responseText);
//     //     for (let i = 0; i < response.results.length; i++) { // add each object to the list
//     //       speciesList.push(response.results[i]);
//     //     }
//     //     if (response.next) {
//     //       requestSpecies(pageNumber+1); // recursivly call the function with the new page
//     //     }
//     //   } else {
//     //     console.log('Error in network request: ' + req.statusText);
//     //   }
//     // });
//     // req.send(null);
//     // event.preventDefault();
//   });
// };

function requestPlanets(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  console.log('requesting the planets page '+pageNumber);
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
      } else {
        console.log('All done requesting planets');
      }
    } else {
      console.log('Error in network request: ' + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function requestVehicles(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  console.log('requesting the vehicles page '+pageNumber);
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
      } else {
        console.log('All done requesting vehicles');
      }
    } else {
      console.log('Error in network request: ' + req.statusText);
    }
  });
  req.send(null);
  event.preventDefault();
}

function loadSpeciesDropdown() {
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
  const species = document.getElementById('speciesDropdown').options[speciesDropdown.selectedIndex].text;
  const planet = document.getElementById('planetsDropdown').options[planetsDropdown.selectedIndex].text;
  const vehicle = document.getElementById('vehiclesDropdown').options[vehiclesDropdown.selectedIndex].text;
  const myPlayer = character(name, species, planet, vehicle, true);
  console.log(
    `
    Name: ${myPlayer.getName()}
    Species: ${myPlayer.getSpecies()}
    Planet: ${myPlayer.getPlanet()}
    Vehicle: ${myPlayer.getVehicle()}
    IsPlayer: ${myPlayer.isPlayer()}
    `
  );
  const charCreation = document.getElementById('charCreation');
  charCreation.style.right = "-100%";

  // clean up the html from unused elements
  setTimeout(removeModalAndCharCreation, 1000);
  const main = document.getElementsByTagName('main')[0];
  main.style.display = "block";

  gameLoop(myPlayer);
};

function removeModalAndCharCreation() {
  const modal = document.getElementById('myModal');
  modal.parentNode.removeChild(modal);

  const charCreation = document.getElementById('charCreation');
  charCreation.parentNode.removeChild(charCreation);
}

function populateMessageOptions() {
  messageOptions.push({message: "Oh, I don't think so!", type: "worst"}); // worst
  messageOptions.push({message: "What's in it for me?", type: "bad"}); // bad
  messageOptions.push({message: "What could go wrong?", type: "good"}); // good
  messageOptions.push({message: "Sure thing.", type: "best"}); // best

  console.log(messageOptions);
}

function showOptions() {
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const section = document.getElementById('options');
  const leftButton = document.createElement('button');
  leftButton.id = "badChoice";
  leftButton.className = "button";

  const rightButton = document.createElement('button');
  rightButton.id = "goodChoice";
  rightButton.className = "button";

  leftButton.innerHTML = messageOptions[getRandInt(0, 2)].message; // show the bad option
  section.appendChild(leftButton);

  rightButton.innerHTML = messageOptions[getRandInt(2, 4)].message; // show the good option
  section.appendChild(rightButton);
}

function addChatMessage(message, sender = null) {
  console.log("adding a message: "+message);
  const div = document.createElement('div');
  div.className = "chat";
  const pMessage = document.createElement('p');
  pMessage.className = "message";
  pMessage.innerHTML = message;
  if (sender != null) {
    if (sender.isPlayer()) {
      div.className = "chat playerChat";
    }
    if (sender.isEnemy()) {
      div.className = "chat enemyChat";
    }
  }
  div.appendChild(pMessage);
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.appendChild(div);
}

function gameLoop(myPlayer) {
  const enemy = new character();
  enemy.setIsEnemy(true);
  console.dir("Enemy: "+enemy.isEnemy());
  addChatMessage("Hello World", enemy);
  addChatMessage("this is a test to see how long the chat message can get test test sdf fg afg asd fasdf  dsfasdfasdfasdfasd asgasdfs", enemy);

  showOptions();

  // document.getElementById('goodChoice').addEventListener("click", addChatMessage;
  // document.getElementById('badChoice').addEventListener("click", addChatMessage;

  // TODO: Set up JSON object with all the story options and 
}


// Global variables
const character = function (myName, mySpecies, myPlanet, myVehicle, isPlayer = false) {
  let hp = 10;
  let damage = 2;
  let speed = 5;
  let shield = 10;
  let enemy = false;
  const name = myName;
  const species = mySpecies;
  const planet = myPlanet;
  const vehicle = myVehicle;
  const player = isPlayer;
  return Object.create ({
    getHealth: () => hp,
    getDamage: () => damage,
    getSpeed: () => speed,
    getShield: () => shield,
    getName: () => name,
    getSpecies: () => species,
    getPlanet: () => planet,
    getVehicle: () => vehicle,
    isPlayer: () => player,
    isEnemy: () => enemy,

    setHealth: (health) => {hp = health;},
    setDamage: (dmg) => {damage = dmg;},
    setSpeed: (newSetting) => {speed = newSetting;},
    setShield: (newSetting) => {shield = newSetting;},
    setIsEnemy: (newSetting) => {enemy = newSetting;}
  });
};
var speciesList = []; // the array to hold all the species
var planetsList = []; // the array to hold all the planets
var vehiclesList = []; // the array to hold all the vehicles
var messageOptions = []; // an array that holds all the player's messages
