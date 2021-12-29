let pickupPoints = [
  {
    state: "madhyaPradesh",
    points: ["Jabalpur", "Bhopal", "Indore"],
  },
  {
    state: "maharashtra",
    points: ["Mumbai", "Nagpur", "Nanded"],
  },
  {
    state: "northEast",
    points: ["Shillong", "Guwahati", "Imphal"],
  },
  {
    state: "rajashtan",
    points: ["Jaipur", "Jodhpur", "Udaipur"],
  },
  {
    state: "kerela",
    points: ["Kochi", "Kollam", "thiruvananthapuram"],
  },
  {
    state: "uttarakhand",
    points: ["Srinagar", "Nainital", "Haldwani"],
  },
  {
    state: "gujrat",
    points: ["Ahmedabad", "Vadodara", "Surat"],
  },
];

let pickupStateSelector = document.querySelector("#pickup-state");
let pickupCitySelector = document.querySelector("#pickup-city");
let vehicleTypeSelector = document.querySelector("#vehicle-type");
let dateSelector = document.querySelector("#dateOfJourney");
let passengerForm = document.querySelector("#passenger-form");
let submitButtonDiv = document.querySelector("#submit-btn");
let passengerNo = document.querySelector("#passengerNumber");
const go = document.querySelector("#go");
const reset = document.querySelector("#reset");



submitButtonDiv.innerHTML = '<h3 class="text-center text-secondary fw-light bg-dark p-4">Select the above choices then press "GO"</h3>';

function generateCityOptions() {
  // removing city options
  const removeOptions = document.querySelectorAll(".city-options");
  removeOptions.forEach((option) => {
    option.remove();
  });

  // adding new city options
  for (let pickedState of pickupPoints) {
    if (pickedState.state == pickupStateSelector.value) {
      for (let point of pickedState.points) {
        let createOption = document.createElement("option");
        createOption.classList.add("city-options");
        createOption.setAttribute = ("value", `${point}`);
        createOption.innerText = `${point}`;
        pickupCitySelector.appendChild(createOption);
      }
    }
  }
}

function createPassengerInputs() {
    passengerForm.innerHTML = "";
    for (let i = 1; i <= passengerNo.value; i++) {
      passengerForm.innerHTML = passengerForm.innerHTML +
        `<aside class="passenger-input"><h5 class="input-header">Passenger ${i}</h5><div class="input-details"><div class="pName user-input"><label for="p${i}name">Name</label><input type="text" name="p${i}name" id="p${i}name" required></div><div class="pId user-input"><label for="p${i}id">Aadhar Id</label><input type="text" name="p${i}id" id="p${i}id" maxlength="12" minlength="12" required></div><div class="pAge user-input"><label for="p${i}age">Age</label><input type="number" name="p${i}age" id="p${i}age" min="3" max="100" required></div><div class="pHealth user-input"><a class="fitness-dialouge" href="#">Medically Fit?</a><input type="checkbox" name="p${i}health" id="p${i}health" required></div></div></aside>`;
    }
  submitButtonDiv.innerHTML = '';
}

go.addEventListener("click", function () {
  createPassengerInputs();
  sessionStorage.setItem('pickedState',pickupStateSelector.value);
  sessionStorage.setItem('pickedCity', pickupCitySelector.value);
  sessionStorage.setItem('pickedVehicle', vehicleTypeSelector.value);
  sessionStorage.setItem('pickedDate', dateSelector.value);
  sessionStorage.setItem('pickedNop', passengerNo.value);
});

reset.addEventListener("click", function () {
  const removeOptions = document.querySelectorAll(".city-options");
  removeOptions.forEach((option) => {
    option.remove();
  });
  passengerForm.innerHTML = "";
  pickupStateSelector.selectedIndex = 0;
  vehicleTypeSelector.selectedIndex = 0;
  submitButtonDiv.innerHTML = '<h3 class="text-center text-secondary fw-light bg-dark p-4">Select the above choices then press "GO"</h3>';
});

function addPassenger(){
    let nop = parseInt(passengerNo.value);
    console.log(nop);
    let passengers = [];
    let name,age,id;
    for( let i = 1; i<=nop ; i++){
        name = document.getElementById(`p${i}name`).value;
        console.log(name);
        age = document.getElementById(`p${i}age`).value;
        console.log(age);
        id = document.getElementById(`p${i}id`).value;
        console.log(id);
        let passenger ={
            name: name,
            age: age,
            aadharId: id
        }
        passengers.push(passenger);
     }
    sessionStorage.setItem('passengerObj', JSON.stringify(passengers));
    }
document.querySelector('#formSubmit').addEventListener('click', addPassenger);