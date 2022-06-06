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

// ------ Variable declaration
let pickupStateSelector = document.querySelector("#pickup-state");
let pickupCitySelector = document.querySelector("#pickup-city");
let vehicleTypeSelector = document.querySelector("#vehicle-type");
let dateSelector = document.querySelector("#dateOfJourney");
let passengerForm = document.querySelector("#passenger-form");
let submitButtonDiv = document.querySelector("#submit-btn");
let passengerNo = document.querySelector("#passengerNumber");
const go = document.querySelector("#go");
const reset = document.querySelector("#reset");



// Date Selector limit
let currentDate = new Date();
let dayToday = currentDate.getDate();
let monthToday = currentDate.getMonth();
let yearToday = currentDate.getFullYear();
let zero = '';
if(monthToday+1 < 10){
  zero='0';
}
dateSelector.setAttribute("min", `${yearToday}-${zero}${monthToday+1}-${dayToday}`);
dateSelector.setAttribute("max", `${yearToday}-${zero}${monthToday+6}-${dayToday}`);



// -------- Default values
document.querySelector('#formSubmit').style.display = 'none';
submitButtonDiv.innerHTML = '<h3 class="text-center text-secondary fw-light bg-dark py-5">Select the above choices then press "GO"</h3>';



// Default functions


// --------- Checking validations in filter fields
function checkFilerFields() {
  if(pickupStateSelector.selectedIndex === 0){
    go.classList.add('disableHover');
    return go.setAttribute("disabled", "true");
  }
  if(pickupCitySelector.value === ''){
    go.classList.add('disableHover');
    return go.setAttribute("disabled", "true");
  }
  if(passengerNo.value === ''){
    go.classList.add('disableHover');
    return go.setAttribute("disabled", "true");
  }
  if(dateSelector.value === ''){
    go.classList.add('disableHover');
    return go.setAttribute("disabled", "true");
  }

  go.classList.remove('disableHover');
  go.removeAttribute("disabled");

  document.querySelector('.filter-area').removeEventListener('click', checkFilerFields);
}

window.addEventListener("load", (event) => {
  checkFilerFields();
  
  window.removeEventListener('load', checkFilerFields);
});

document.querySelector('.filter-area').addEventListener('click', checkFilerFields);



// -------- Generating Pickup cities on the basis of Selected state
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


// -------- Creating passenger inputs according to the filters
function createPassengerInputs() {
    passengerForm.innerHTML = "";
    for (let i = 1; i <= passengerNo.value; i++) {
      passengerForm.innerHTML = passengerForm.innerHTML +
        `<aside class="passenger-input"><h5 class="input-header">Passenger ${i}</h5><div class="input-details"><div class="pName user-input"><label for="p${i}name">Name</label><input type="text" name="p${i}name" id="p${i}name" required></div><div class="pId user-input"><label for="p${i}id">Aadhar Id</label><input type="text" name="p${i}id" id="p${i}id" maxlength="12" minlength="12" required></div><div class="pAge user-input"><label for="p${i}age">Age</label><input type="number" name="p${i}age" id="p${i}age" min="3" max="100" required></div><div class="pGender user-input"><label for="genderType">Select Gender</label><select id="p${i}gender" class=""><option value="" Selected>--Gender--</option><option value="M">Male</option><option value="F">Female</option></select></div></div></aside>`;
    }
    passengerForm.innerHTML += '<div class="pHealth user-input align-items-center"><a class="fitness-dialouge" href="#">All passengers Medically Fit?</a><input type="checkbox" id="health" required></div>';
    submitButtonDiv.innerHTML = '';
    document.querySelector('#formSubmit').style.display = 'block';
}


// --------- Go button function to push details to the session storage
function goButton() {
  createPassengerInputs();
  sessionStorage.setItem('pickedState',pickupStateSelector.value);
  sessionStorage.setItem('pickedCity', pickupCitySelector.value);
  sessionStorage.setItem('pickedVehicle', vehicleTypeSelector.value);
  sessionStorage.setItem('pickedDate', dateSelector.value);
  sessionStorage.setItem('pickedNop', passengerNo.value);

  go.removeEventListener('click',goButton);
}
go.addEventListener("click", goButton);


// -------- Reset default filter details
function resetFields() {
  const removeOptions = document.querySelectorAll(".city-options");

  removeOptions.forEach((option) => {
    option.remove();
  });

  // Checking the Filter validations
  checkFilerFields();

  passengerForm.innerHTML = "";
  pickupStateSelector.selectedIndex = 0;
  vehicleTypeSelector.selectedIndex = 0;
  passengerNo.value = 0;
  document.querySelector('#formSubmit').style.display = 'none';
  submitButtonDiv.innerHTML = '<h3 class="text-center text-secondary fw-light bg-dark py-5">Select the above choices then press "GO"</h3>';

  reset.removeEventListener("click", resetFields);
}
reset.addEventListener("click", resetFields);


// ----- Add passenger object to the session storage
function addPassenger(){
    let nop = parseInt(passengerNo.value);
    let passengers = [];    // PassengerList Array
    let name,age,id;

    // creating a passenger Array of Object
    for( let i = 1; i<=nop ; i++){
        name = document.getElementById(`p${i}name`).value;
        console.log(name);
        age = document.getElementById(`p${i}age`).value;
        console.log(age);
        id = document.getElementById(`p${i}id`).value;
        console.log(id);
        gender = document.getElementById(`p${i}gender`).value;
        console.log(gender);
        
        // Passenger Object
        let passenger ={
            name: name,
            age: age,
            aadharId: id,
            gender: gender
        }
        
        // pushing object to array
        passengers.push(passenger);
     }
     
    //  setting into session storage
     sessionStorage.setItem('passengerObj', JSON.stringify(passengers));

     document.querySelector('#formSubmit').removeEventListener('click', addPassenger);
    }
document.querySelector('#formSubmit').addEventListener('click', addPassenger);