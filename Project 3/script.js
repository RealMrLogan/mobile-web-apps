/*jshint esversion: 6 */
window.onload = function() {
  var docBod = document.body;
  for (var j = 1; j < 8; j++) {
    (function(i) {                  //need to create closure for j
      var f = i;
      var req = new XMLHttpRequest();
      var URLhost = 'https://swapi.co/api/planets/?page=' + f;
      req.open('GET', URLhost, true);
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = JSON.parse(req.responseText);
          console.log(response);
          var planetHead = document.createElement('h5');
          docBod.appendChild(planetHead);
          planetHead.textContent = 'Planets Page - ' + f;
          var planetList = document.createElement('ol');
          planetHead.appendChild(planetList);

          for (var k = 0; k < response.results.length; k++) {
            (function(y) {
              var planetIn = document.createElement('li');
              planetIn.textContent = response.results[y].name;
              planetList.appendChild(planetIn);
            })(k);
          }

        } else {
          console.log('Error in network request: ' + req.statusText);
        }
      });
      req.send(null);
      event.preventDefault();
    })(j);
  }
};

document.getElementById('startGame').onclick = function() { // initialize the game
  console.log("started the game");
  const name = document.getElementById('name').value;
  const species = document.getElementById('species').value;
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
