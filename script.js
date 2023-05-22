const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//Sort in descending
function sortMoney() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Show Millionaire
function showMill() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDOM();
}

//Calculate entire wealth
function calcWealth() {
  const total = data.reduce((acc, user) => acc + user.money, 0);

  const totalElement = document.createElement("div");
  totalElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(totalElement);
}

//Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortMoney);
showMillBtn.addEventListener("click", showMill);
calWealthBtn.addEventListener("click", calcWealth);
