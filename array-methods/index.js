const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

// This is where the users will be added
let users = [];

// Add new user Object to data array
function addData(obj) {
  // push the new object to the users array
  users.push(obj);

  // Update the DOM
  updateDOM();
}

// Fetch random user and add money
async function getRandomUser() {
  // fetch is async - have to wait for it to finish - returns a promise
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  console.log(data);

  // getting the first item in results the array
  const user = data.results[0];
  console.log(user);

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  console.log(newUser);
  addData(newUser);
}

getRandomUser();
getRandomUser();
getRandomUser();

// Format number as money using regex
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Update DOM
function updateDOM(providedUser = users) {
  // Clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // Loop thorugh the users array
  providedUser.forEach((person) => {
    // create a div for each person
    const element = document.createElement('div');
    // Add person class to the new div
    element.classList.add('person');
    // Add the text from the data
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    // Append the div
    main.appendChild(element);
  });
}

// Double the users money
function doubleMoney() {
  // reassigning the users object (money)
  users = users.map((user) => {
    // use the spread operator to copy the array
    // then set the money to user.money and multiply by 2
    return { ...user, money: user.money * 2 };
  });

  // Update the DOM
  updateDOM();
}

// Sort the users by richest
function sortByRichest() {
  // Sorting the users object - by the money property
  users.sort((a, b) => {
    // want this to be descending - so we do b - a instead of a - b
    return b.money - a.money;
  });

  // Update the DOM
  updateDOM();
}

// Filter only millionaires
function filterMillionaires() {
  // Filter the users object
  users = users.filter((user) => {
    // return only users that have a million dollars
    return user.money > 1000000;
  });

  // Update the DOM
  updateDOM();
}

// Calculate the total wealth of users
function calculateWealth() {
  // Reduce all users money to show wealth
  const wealth = users.reduce((acc, user) => {
    // return the accumulator and append the user.money and start at 0
    return (acc += user.money);
  }, 0);

  console.log(wealth);

  // create a new div element
  const wealthEl = document.createElement('div');
  // set the div element to have an h3 with a strong element
  // use the formatMoney function and use the wealth variable (number) as an argument
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  // append the wealth element to the DOM
  main.appendChild(wealthEl);
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
