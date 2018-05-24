/* jshint esversion: 6 */

const colors = ["blue", "red", "yellow", "orange", 'purple', 'green'];
console.log("Use traditional for loop");
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
console.log('Use "for of" loop');
for(let i of colors) {
  console.log(i);
}
console.log('Use map');
const numbers = [1,2,3,4,5];
const newNumbers = numbers.map(function(number) {
  return number *-1;
});
console.log(newNumbers);
console.log('Use arrow syntax');
const negNumbers = numbers.map(number => number*-1);
console.log(negNumbers);
