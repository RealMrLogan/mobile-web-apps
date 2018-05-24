/*jshint esversion: 6 */
const Superman = {
  name: 'Superman',
  'real name': 'Clark Kent',
  height: 75,
  weight: 235,
  hero: true,
  villain: false,
  allies: ['Batman', 'Supergirl', 'Superboy'],
  fly() {
    return 'Up, up and away!';
  }
};
const Spiderman = {};
console.log(Superman.name);
console.log(Superman["real" + " " + "name"]); // the property is built using string concatenation
'city' in Superman; // Should == false
Superman.city !== undefined;
Superman.hasOwnProperty('city');

for (const key in Superman) {
  console.log(key + ": " + Superman[key]); // logs all the methods in Object
}

for (const key of Object.keys(Superman)) { // returns all keys in Object
  console.log(key);
}
for (const value of Object.values(Superman)) { //returns all values in Object
  console.log(value);
}
delete Superman.fly; // deletes the fly() function

const justiceLeague = { // nested Objects
  superman: {
    realName: 'Clark Kent'
  },
  batman: {
    realName: 'Bruce Wayne'
  },
  wonderWoman: {
    realName: 'Diana Prince'
  },
  flash: {
    realName: 'Barry Allen'
  },
  aquaman: {
    realName: 'Arthur Curry'
  },
};