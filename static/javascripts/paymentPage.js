let selectedOption = document.querySelectorAll(".payment-card");
let selectedBtn = document.querySelectorAll(".card-name");

let pickupCity = sessionStorage.pickedCity;
let pickupState = sessionStorage.pickedState;
let stateName = sessionStorage.StateName;
let vehicleType = sessionStorage.vehicleType;
let dateOfBooking = sessionStorage.dateOfBooking;
let tourSource = sessionStorage.tourSource;
let numberOfPersons = parseInt(sessionStorage.pickedNop);
let userName = sessionStorage.userName;
let baseFare = parseInt(sessionStorage.baseFare);
let dateOfJourney = sessionStorage.pickedDate;
let vehicleFare = parseInt(sessionStorage.pickedVehicle);
let totalFoodPackage = parseInt(sessionStorage.totalFoodPackage);
let passengerData = JSON.parse(sessionStorage.passengerObj);
let foodData = JSON.parse(sessionStorage.foodObj);
let userId = sessionStorage.userId;
let grandFare = parseInt(sessionStorage.finalFare);

passengerData.forEach(data=>{
    data.age = parseInt(data.age);
    data.aadharId = parseInt(data.aadharId);
})
foodData.forEach(data=>{
    data.Price = parseInt(data.Price);
    data.Qty = parseInt(data.Qty);
})

window.addEventListener("load", (event) => {
  document.querySelector("#grandFare").innerText = grandFare;
});

selectedBtn.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    selectedBtn.forEach((section, i) => {
      if (section.classList.contains("activated-button")) {
        section.classList.remove("activated-button");
        console.log("removed from ", i + 1);
        selectedOption[i].classList.remove("activated-card");
        console.log(
          `We were on : ${selectedOption[i].firstElementChild.innerText}`
        );
      }
    });
    console.log("activated on", index + 1);
    btn.classList.add("activated-button");
    selectedOption[index].classList.add("activated-card");
    console.log(
      `We are on : ${selectedOption[index].firstElementChild.innerText}`
    );
  });
});

const pay = document.querySelector(".paymentButton");

pay.addEventListener("click", async function () {
  stateId = document.querySelector('#stateId');
  const ticket = {
    user_Id: userId,
    user_Name: userName,
    state_Name: stateName,
    tour_Source: tourSource,
    base_Fare: baseFare,
    date_of_Booking: dateOfBooking,
    date_of_Journey: dateOfJourney,
    no_of_persons: numberOfPersons,
    passenger_details: passengerData,
    food_Opted: foodData,
    food_Fare: totalFoodPackage,
    vehicle_Type: vehicleType,
    vehicle_Fare: vehicleFare,
    pickup_State: pickupState,
    pickup_City: pickupCity,
    grand_Fare: grandFare,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
    referrerPolicy: "no-referrer-when-downgrade",
    mode: "cors",
    credentials: "same-origin",
    cache: "default",
    redirect: "follow",
    integrity: "",
    keepalive: true,
    signal: undefined,
    window: window,
  };
  const response = await fetch(`/ticket`, options);
  console.log(response);
  const json = await response.json();
  if (json) {
      redirect: window.location.replace("/");
  }
  console.log(json);
});
