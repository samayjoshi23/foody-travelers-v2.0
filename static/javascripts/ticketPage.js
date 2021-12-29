const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const vehicles = [
  {
    name: "Bus (Double Decker, Volvo...)",
    fare: 1000,
  },
  {
    name: "5 - Seater (Bolero, Scorpio, Fortuner...)",
    fare: 3000,
  },
  {
    name: "7 - Seater (Innova, Ertiga, Safari...)",
    fare: 5000,
  },
];

const selectedCity = sessionStorage.pickedCity;
let foodData;
if (sessionStorage.foodObj) {
  foodData = JSON.parse(sessionStorage.foodObj);
} else {
  foodData = "No additional food selected";
}
const passengerData = JSON.parse(sessionStorage.passengerObj);
const selectedDate = sessionStorage.pickedDate;
const selectedState = sessionStorage.pickedState;
const selectedNop = parseInt(sessionStorage.pickedNop);
const selectedVehicle = parseInt(sessionStorage.pickedVehicle);
const foodTotalFare = parseInt(sessionStorage.totalFoodPackage);

let baseFare = parseInt(document.querySelector("#baseFareSpan").innerText);
const grandFare = (baseFare * selectedNop) + foodTotalFare + selectedVehicle;

const Today = new Date();
document.querySelector("#dobSpan").innerText = `${Today.getDate()} ${
  months[Today.getMonth()]
}, ${Today.getFullYear()}`;

let vehicleType;
let vehicleFare;
for (let vehicle of vehicles) {
  if (vehicle.fare === selectedVehicle) {
    vehicleFare = vehicle.fare;
    vehicleType = vehicle.name;
  }
}

let passengerList = document.querySelector("#passengerList");
let foodList = document.querySelector("#foodList");

function ticket() {
  let headerRight = document.querySelector(".details-header-right");
  headerRight.children[0].lastElementChild.innerText =
    selectedState.toUpperCase();
  headerRight.children[1].lastElementChild.innerText =
    selectedCity.toUpperCase();
  headerRight.children[2].lastElementChild.innerText = `Floor 2, Building 4, Foody-Traveler Campus, MR-4 Road, ${selectedCity}, ${selectedState}`;

  document.querySelector("#vehicleType").innerText = vehicleType;
  document.querySelector("#vehicleFare").innerText = `Rs: ${vehicleFare}.00`;
  document.querySelector("#doj").innerText = selectedDate;
  document.querySelector(
    "#totalFoodFare"
  ).innerText = `Rs: ${foodTotalFare}.00 (For Additional Food Selection)`;

  document.querySelector("#grandFare").innerText = `Rs. ${grandFare}.00`;

  passengerData.forEach((passenger) => {
    let newLi = document.createElement("li");
    newLi.innerText = `${passenger.name}-(${passenger.age})`;
    passengerList.appendChild(newLi);
  });

  if (foodData !== "No additional food selected") {
    foodData.forEach((food) => {
      let newLi = document.createElement("li");
      newLi.innerText = `${food.name}-(${food.Qty})`;
      foodList.appendChild(newLi);
    });
  }
}

document.querySelector(".payBtn").addEventListener("click", function () {
  let StateName = document.querySelector("#stateNameSpan").innerText;
  let tourSource = document.querySelector("#tourSourceSpan").innerText;
  let tourDuration = document.querySelector("#tourDurationSpan").innerText;
  let userId = document.querySelector("#UserId").innerText;
  let userName = document.querySelector("#UserName").innerText;
  let dateOfBooking = document.querySelector("#dobSpan").innerText;

  sessionStorage.setItem("StateName", StateName);
  sessionStorage.setItem("tourSource", tourSource);
  sessionStorage.setItem("baseFare", baseFare);
  sessionStorage.setItem("tourDuration", tourDuration);
  sessionStorage.setItem("userId", userId);
  sessionStorage.setItem("userName", userName);
  sessionStorage.setItem("vehicleType", vehicleType);
  sessionStorage.setItem("dateOfBooking", dateOfBooking);
  sessionStorage.setItem("finalFare", grandFare);
});

window.addEventListener("load", (event) => {
  ticket();
});
