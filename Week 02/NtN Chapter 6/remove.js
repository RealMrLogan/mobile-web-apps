/* jshint esversion: 6 */
const nav = document.getElementById('nav');
const dropdown = document.getElementById('moreDropdown');
const dropdownMenu = document.getElementById('dropdown-menu');
console.dir(nav);
console.dir(dropdown);
nav.removeChild(dropdown);
console.dir(dropdownMenu);

for (let i = 0; i<6; i+2) {
  console.dir(dropdownMenu.children[i]);
  nav.appendChild(dropdownMenu.children[i]);
}
console.dir(nav);
