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
function createRestaurant(logo, name, vicinity) {
  // creates a new section
  let restaurantSection = document.createElement('SECTION');
  restaurantSection.className = "restSection container";

  let overviewDiv = createOverview(logo, name);
  let detailsDiv = createDetails(vicinity);

  restaurantSection.appendChild(overviewDiv);
  restaurantSection.appendChild(detailsDiv);

  return restaurantSection;
}

function createOverview(logo, name) { // returns a DIV element w/ logo and name
  // creates a DIV for the logo
  let imgDiv = document.createElement('DIV');
  imgDiv.className = "logo";
  let img = document.createElement('IMG');
  img.src = logo;
  imgDiv.appendChild(img);
  // restaurantSection.appendChild(imgDiv);

  // creates a DIV for the name
  let nameDiv = document.createElement('DIV');
  nameDiv.className = "name";
  let restName = document.createElement('P');
  restName.className = 'foodName';
  restName.innerHTML = name;
  nameDiv.appendChild(restName);

  // puts them inside a DIV
  let overview = document.createElement('DIV');
  overview.className = "container overview";
  overview.appendChild(imgDiv);
  overview.appendChild(nameDiv);

  overview.ontouchstart = () => {
    // this.style.width = '90%';
    overview.style.backgroundColor = 'white';
  };
  overview.ontouchend = () => {
    overview.style.backgroundColor = 'rgb(161, 145, 139)';

    let cancel = this.ontouchcancel;
    if (cancel) {return;}
    console.log('You touched '+overview.children[1].children[0].innerHTML);
  };

  return overview;
}

function createDetails(vicinity) {
  // add all the information for the accordian
  let accordianDiv = document.createElement('DIV');
  accordianDiv.className = "panel";
  let address = document.createElement('P');
  address.innerHTML = vicinity;
  accordianDiv.appendChild(address);

  return accordianDiv;
}
/*****************************/
var acc = document.getElementsByClassName("overview");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
/*******************************/
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
        myFoodList.appendChild(createRestaurant("res/subway.png", results[i].name, results[i].vicinity));
      } else if (wordInString(results[i].name, "mcdonald's")) {
        myFoodList.appendChild(createRestaurant("res/mcdonalds.png", results[i].name, results[i].vicinity));
      } else if (wordInString(results[i].name, "domino's")) {
        myFoodList.appendChild(createRestaurant("res/dominos.png", results[i].name, results[i].vicinity));
      } else if (wordInString(results[i].name, "pizza hut")) {
        myFoodList.appendChild(createRestaurant("res/pizzahut.png", results[i].name, results[i].vicinity));
      } else if (wordInString(results[i].name, "pizza")) {
        myFoodList.appendChild(createRestaurant("res/pizza.png", results[i].name, results[i].vicinity));
      } else if (wordInString(results[i].name, "taco bell")) {
        myFoodList.appendChild(createRestaurant("res/tacobell.png", results[i].name, results[i].vicinity));
      } else {
        myFoodList.appendChild(createRestaurant("res/default.png", results[i].name));
      }
    }
    console.log(results[1]);

  }
}

google.maps.event.addDomListener(window, 'load', initialize);
