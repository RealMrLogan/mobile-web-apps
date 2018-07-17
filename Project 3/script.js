/*jshint esversion: 6 */
window.onload = function() {
  startLoadingScreen();

  requestSpecies(1);
  requestPlanets(1);
  requestVehicles(1);
};

// TODO: The request functions work the same, consider redesiging to properly use a promise

function requestSpecies(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  const url = 'https://swapi.co/api/species/?page=' + pageNumber; // sets up to iterate through the pages
  fetch(url).then((response) => {
    response.json().then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        speciesList.push(data.results[i]);
      }
      if (data.next) {
        requestSpecies(pageNumber+1); // recursivly call the function with the new page
      } else {
        alphabetizeSpecies();
        loadSpeciesDropdown();
        finishLoadingScreen();
      }
    });
  });
}

function alphabetizeSpecies() {
  let newSpecies = [];
  for (var i = 0; i < speciesList.length; i++) {
    newSpecies.push(speciesList[i].name);
  }
  speciesList = newSpecies.sort();
}

function requestPlanets(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  const url = 'https://swapi.co/api/planets/?page=' + pageNumber; // sets up to iterate through the pages
  fetch(url).then((response) => {
    response.json().then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        planetsList.push(data.results[i]);
      }
      if (data.next) {
        requestPlanets(pageNumber+1); // recursivly call the function with the new page
      } else {
        alphabetizePlanets();
        loadPlanetsDropdown();
        finishLoadingScreen();
      }
    });
  });
}

function alphabetizePlanets() {
  let newPlanets = [];
  for (var i = 0; i < planetsList.length; i++) {
    newPlanets.push(planetsList[i].name);
  }
  planetsList = newPlanets.sort();
}

function requestVehicles(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  const url = 'https://swapi.co/api/vehicles/?page=' + pageNumber; // sets up to iterate through the pages
  fetch(url).then((response) => {
    response.json().then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        vehiclesList.push(data.results[i]);
      }
      if (data.next) {
        requestVehicles(pageNumber+1); // recursivly call the function with the new page
      } else {
        alphabetizeVehicles();
        loadVehiclesDropdown();
        finishLoadingScreen();
      }
    });
  });
}

function alphabetizeVehicles() {
  let newVehicles = [];
  for (var i = 0; i < vehiclesList.length; i++) {
    newVehicles.push(vehiclesList[i].name);
  }
  vehiclesList = newVehicles.sort();
}

function startLoadingScreen() {
  const modal = document.getElementById('myModal');
  const charCreation = document.getElementById('charCreation');
  modal.style.display = "block";
  charCreation.className = "blur";
}

/**
* This function is called whenever a request is done
*/
function finishLoadingScreen() { // redefines itself once
  finishLoadingScreen = function() { // twice
    finishLoadingScreen = function() { // and a third time
      const modal = document.getElementById('myModal');
      const charCreation = document.getElementById('charCreation');
      modal.style.display = "none";
      charCreation.className = "";
    };
  };
}

function loadSpeciesDropdown() {
  for (let i = 0; i < speciesList.length; i++) {
    let speciesName = document.createElement('option');
    speciesName.innerHTML = speciesList[i];
    document.getElementById('speciesDropdown').add(speciesName);
  }
}

function loadPlanetsDropdown() {
  for (let i = 0; i < planetsList.length; i++) {
    let planetsName = document.createElement('option');
    planetsName.innerHTML = planetsList[i];
    document.getElementById('planetsDropdown').add(planetsName);
  }
}

function loadVehiclesDropdown() {
  for (let i = 0; i < vehiclesList.length; i++) {
    let vehiclesName = document.createElement('option');
    vehiclesName.innerHTML = vehiclesList[i];
    document.getElementById('vehiclesDropdown').add(vehiclesName);
  }
}

document.getElementById('startGame').onclick = function() { // initialize the game
  const name = document.getElementById('name').value;
  const species = document.getElementById('speciesDropdown').options[speciesDropdown.selectedIndex].text;
  const planet = document.getElementById('planetsDropdown').options[planetsDropdown.selectedIndex].text;
  const vehicle = document.getElementById('vehiclesDropdown').options[vehiclesDropdown.selectedIndex].text;
  const myPlayer = character(name, species, planet, vehicle, true);
  const charCreation = document.getElementById('charCreation');
  charCreation.style.right = "-100%";
  // TODO: make the transition slide to the right

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

function showOptions(leftMessage, rightMessage) {
  const oldleftButton = document.getElementById('badChoice');
  if (oldleftButton) {
    oldleftButton.parentNode.removeChild(oldleftButton);
  }
  const oldrightButton = document.getElementById('goodChoice');
  if (oldrightButton) {
    oldrightButton.parentNode.removeChild(oldrightButton);
  }
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const section = document.getElementById('options');
  const leftButton = document.createElement('button');
  leftButton.id = "badChoice";

  const rightButton = document.createElement('button');
  rightButton.id = "goodChoice";

  leftButton.innerHTML = leftMessage; // show the bad option
  section.appendChild(leftButton);

  rightButton.innerHTML = rightMessage; // show the good option
  section.appendChild(rightButton);
}

function addChatMessage(message, isPlayer = null) {
  const div = document.createElement('div');
  div.className = "chat";
  const pMessage = document.createElement('p');
  pMessage.className = "message";
  pMessage.innerHTML = message;
  // pMessage.id = "newMessage";
  if (isPlayer != null) {
    if (isPlayer == true) {
      div.className = "chat playerChat";
    }
    if (isPlayer == false) {
      div.className = "chat friendChat";
    }
  }
  div.appendChild(pMessage);
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.appendChild(div);
  const pos = document.getElementById('chatBox');
  pos.scrollTop = pos.scrollHeight; // since this number will always be greater, it sets it to the max

  let i = 0;
  let speed = 50;
  // typingMessage();
  function typingMessage() {
    const newMessage = document.getElementById('newMessage');

    if (i < message.length) {
      console.log("typing the message at: "+i);
      newMessage.innerHTML += message.charAt(i);
      i++;
      const pos = document.getElementById('chatBox');
      pos.scrollTop = pos.scrollHeight; // since this number will always be greater, it sets it to the max
      setTimeout(typingMessage, speed);
    } else {
      newMessage.removeAttribute('id');
    }
  }
}

function gameLoop(myPlayer) {
  fetch("choices.json").then((response) => {
    response.json().then((data => {
      function progressStory(choice) {
        function parseString(str) {
          str = str.replace("$species$", myPlayer.getSpecies());
          str = str.replace("$planet$", myPlayer.getPlanet());
          str = str.replace("$vehicle$", myPlayer.getVehicle());
          str = str.replace("$name$", myPlayer.getName());
          return str;
        }

        showOptions(choice.leftButton, choice.rightButton);
        const leftButton = document.getElementById('badChoice');
        const rightButton = document.getElementById('goodChoice');
        const message = parseString(choice.friendMessage);
        addChatMessage(message, false);

        if (choice.leftNext == "") {
          endGame();
          return;
        }

        leftButton.onclick = function() {
          addChatMessage(choice.leftButton, true);
          progressStory(data[choice.leftNext]);
        };
        rightButton.onclick = function() {
          addChatMessage(choice.rightButton, true);
          progressStory(data[choice.rightNext]);
        };
      }
      progressStory(data.choice1); // start the story
    }));
  });
}

function endGame() {
  const options = document.getElementById('options');
  const main = document.getElementsByTagName('main')[0];
  const stars1 = document.getElementById('stars');
  const stars2 = document.getElementById('stars2');
  const stars3 = document.getElementById('stars3');
  const html = document.getElementsByTagName('html')[0];

  options.parentNode.removeChild(options);
  setTimeout(() => {main.parentNode.removeChild(main);}, 1000);
  setTimeout(() => {stars1.parentNode.removeChild(stars1);}, 2000);
  setTimeout(() => {stars2.parentNode.removeChild(stars2);}, 3000);
  setTimeout(() => {stars3.parentNode.removeChild(stars3);}, 4000);
  setTimeout(() => {html.style.backgroundColor = "white";}, 5000);
}

// Global variables
const character = function (myName, mySpecies, myPlanet, myVehicle, isPlayer = false) {
  let hp = 10;
  let damage = 2;
  let speed = 5;
  let shield = 10;
  let friend = false;
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
    isfriend: () => friend,

    setHealth: (health) => {hp = health;},
    setDamage: (dmg) => {damage = dmg;},
    setSpeed: (newSetting) => {speed = newSetting;},
    setShield: (newSetting) => {shield = newSetting;},
    setIsfriend: (newSetting) => {friend = newSetting;}
  });
};
var speciesList = []; // the array to hold all the species
var planetsList = []; // the array to hold all the planets
var vehiclesList = []; // the array to hold all the vehicles
