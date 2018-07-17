/*jshint esversion: 6 */
window.onload = function() {
  // startLoadingScreen();
  //
  // requestSpecies(1);
  // requestPlanets(1);
  // requestVehicles(1);
};

// TODO: The request functions work the same, consider redesiging to properly use a promise

function requestSpecies(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  console.log('requesting the species page '+pageNumber);
  const url = 'https://swapi.co/api/species/?page=' + pageNumber; // sets up to iterate through the pages
  fetch(url).then((response) => {
    response.json().then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        speciesList.push(data.results[i]);
      }
      if (data.next) {
        requestSpecies(pageNumber+1); // recursivly call the function with the new page
      } else {
        console.log('All done requesting species');
        loadSpeciesDropdown();
        finishLoadingScreen();
      }
    });
  });
}

function requestPlanets(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  console.log('requesting the planets page '+pageNumber);
  const url = 'https://swapi.co/api/planets/?page=' + pageNumber; // sets up to iterate through the pages
  fetch(url).then((response) => {
    response.json().then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        planetsList.push(data.results[i]);
      }
      if (data.next) {
        requestPlanets(pageNumber+1); // recursivly call the function with the new page
      } else {
        console.log('All done requesting planets');
        loadPlanetsDropdown();
        finishLoadingScreen();
      }
    });
  });
}

function requestVehicles(pageNumber) { // recursive function so that it is not dependent on hard coding how many pages
  console.log('requesting the vehicles page '+pageNumber);
  const url = 'https://swapi.co/api/vehicles/?page=' + pageNumber; // sets up to iterate through the pages
  fetch(url).then((response) => {
    response.json().then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        vehiclesList.push(data.results[i]);
      }
      if (data.next) {
        requestVehicles(pageNumber+1); // recursivly call the function with the new page
      } else {
        console.log('All done requesting vehicles');
        loadVehiclesDropdown();
        finishLoadingScreen();
      }
    });
  });
}

function startLoadingScreen() {
  console.log('--Started the loading screen--');

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
      console.log('--The loading screen is done--');
      const modal = document.getElementById('myModal');
      const charCreation = document.getElementById('charCreation');
      modal.style.display = "none";
      charCreation.className = "";
    };
  };
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
  console.log('loading the planets dropdown');
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

// function populateMessageOptions() {
//   messageOptions.push({message: "Oh, I don't think so!", type: "worst"}); // worst
//   messageOptions.push({message: "What's in it for me?", type: "bad"}); // bad
//   messageOptions.push({message: "What could go wrong?", type: "good"}); // good
//   messageOptions.push({message: "Sure thing.", type: "best"}); // best
// }

function showOptions(leftMessage, rightMessage) {
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

function typingMessage(letters) {
  letters += "00";
  console.log(`Do this for ${letters} milliseconds`);
}

function addChatMessage(message, isPlayer = null) {
  typingMessage(message.length);
  console.log("adding a message: "+message);
  const div = document.createElement('div');
  div.className = "chat";
  const pMessage = document.createElement('p');
  pMessage.className = "message";
  pMessage.innerHTML = message;
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
}

function gameLoop(myPlayer) {
  // addChatMessage("Hello World", false);
  // addChatMessage("this is a test to see how long the chat message can get test test sdf fg afg asd fasdf  dsfasdfasdfasdfasd asgasdfs", false);

  fetch("choices.json").then((response) => {
    response.json().then((data => {
      function progressStory(choice) {
        console.log(choice);

        showOptions(choice.leftButton, choice.rightButton);
        const leftButton = document.getElementById('badChoice');
        const rightButton = document.getElementById('goodChoice');
        addChatMessage(choice.friendMessage, false);
        leftButton.addEventListener('click', function() {
          addChatMessage(choice.leftButton, true);
          progressStory(data[choice].leftNext);
        });
        rightButton.addEventListener('click', function() {
          addChatMessage(choice.rightButton, true);
          progressStory(data[choice].rightNext);
        });
      }
      progressStory(data.choice2); // start the story
    }));
  });
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
// var messageOptions = []; // an array that holds all the player's messages
