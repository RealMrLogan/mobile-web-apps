/*jshint esversion: 6*/

/****************
* Creates a restaurant section in this format:
<section>
  <div>
    <img> // the logo
  </div>
  <div>
    <p> // name of the restaurant
  </div>
</section>
* Also given appropriate class names.
*****************/
function createRestaurant(logo, name) {
  // creates a new section
  let restaurantSection = document.createElement('SECTION');
  restaurantSection.className = "restSection container";
  restaurantSection.ontouchstart = () => {
    // this.style.width = '90%';
    restaurantSection.style.backgroundColor = 'white';
  };
  restaurantSection.ontouchend = () => {
    restaurantSection.style.backgroundColor = 'rgb(161, 145, 139)';

    let cancel = this.ontouchcancel;
    if (cancel) {return;}
    console.log('You touched '+restaurantSection.children[1].children[0].innerHTML);

  };

  // creates a DIV for the logo
  let imgDiv = document.createElement('DIV');
  imgDiv.className = "logo";
  let img = document.createElement('IMG');
  img.src = logo;
  imgDiv.appendChild(img);
  restaurantSection.appendChild(imgDiv);

  // creates a DIV for the name
  let nameDiv = document.createElement('DIV');
  nameDiv.className = "name";
  let restName = document.createElement('P');
  restName.className = 'foodName';
  restName.innerHTML = name;
  nameDiv.appendChild(restName);

  // add the section to the main list so it can be displayed
  restaurantSection.appendChild(nameDiv);
  return restaurantSection;
}

/******************
* Find a word in a given string
* s = string to be searched
* word = what you're trying to find
*******************/
function wordInString(s, word){
  return new RegExp( '\\b' + word + '\\b', 'i').test(s);
}

/********************************************
* getting the location and storing the names
*********************************************/
function getCoor(position) {
  let pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  console.log(pos.lat, pos.lng);
}

function initialize() {
  navigator.geolocation.getCurrentPosition(getCoor);
  // console.log(pos);
  let center = new google.maps.LatLng(43.817695, -111.789668);
  let map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 13
  });
  let request = {
    location: center,
    radius: 8047, // 5 miles
    types: ['restaurant']
  };

  let service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
  // request.types = 'bakery';
  // service.nearbySearch(request, callback);

  document.getElementById('map').remove();
}

function callback(results, status) { // gets places
  let myFoodList = document.getElementById('foodList');
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      if (wordInString(results[i].name, 'subway')) {
        myFoodList.appendChild(createRestaurant("res/subway.png", results[i].name));
      } else if (wordInString(results[i].name, "mcdonald's")) {
        myFoodList.appendChild(createRestaurant("res/mcdonalds.png", results[i].name));
      } else if (wordInString(results[i].name, "domino's")) {
        myFoodList.appendChild(createRestaurant("res/dominos.png", results[i].name));
      } else if (wordInString(results[i].name, "pizza hut")) {
        myFoodList.appendChild(createRestaurant("res/pizzahut.png", results[i].name));
      } else if (wordInString(results[i].name, "pizza")) {
        myFoodList.appendChild(createRestaurant("res/pizza.png", results[i].name));
      } else if (wordInString(results[i].name, "taco bell")) {
        myFoodList.appendChild(createRestaurant("res/tacobell.png", results[i].name));
      } else {
        myFoodList.appendChild(createRestaurant("res/default.png", results[i].name));
      }
    }
    console.log(results[1]);

  }
}

google.maps.event.addDomListener(window, 'load', initialize);
