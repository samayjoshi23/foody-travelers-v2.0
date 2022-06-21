const addCityBtn = document.querySelector('#addCity-btn');
const cityContainer = document.querySelector('#cities-container');

const addFoodBtn = document.querySelector('#addFood-btn');
const foodContainer = document.querySelector('#food-container');

let addPlacesBtns = document.querySelectorAll('.cityPlaces-btn');
let cityPlacesContainer = document.querySelectorAll('.city-places');



function addCity(e){
    e.preventDefault();
    cityContainer.innerHTML += `<div class="newCity"><div class="city-input"><input type="text" class="inputs" name="cityName" placeholder="City 1 Name"><div class="city-places"><div class="place-inputs"><input type="text" class="inputs" name="cityPlace" placeholder="Place Name"></div><div class="add-btn cityPlaces-btn" >Add Place To City</div></div></div><div class="hotel-input"><input type="text" class="inputs" name="hotelName" placeholder="City - Hotel Name"></div><div class="rest-input"><input type="text" class="inputs" name="restName" placeholder="City - Restaturant Name"></div></div>`;

    addPlacesBtns = document.querySelectorAll('.cityPlaces-btn');
    console.log(addPlacesBtns);

    addPlacesBtns.forEach( btn => {
        btn.addEventListener('click', ()=> {
            btn.previousElementSibling.innerHTML += `<input type="text" class="inputs" name="cityPlace" placeholder="Place Name">`
        });
    });
}
addCityBtn.addEventListener('click', addCity);

addPlacesBtns.forEach( btn => {
    btn.addEventListener('click', ()=> {
        btn.previousElementSibling.innerHTML += `<input type="text" class="inputs" name="cityPlace" placeholder="Place Name">`
    });
});

addFoodBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    foodContainer.innerHTML += `<div class="food-group"><input class="inputs" type="text" name="fName" placeholder="Food Name"><select name="foodTypeSelector" id="foodTypeSelector"><option value="veg">veg</option><option value="non-veg">Non-veg</option></select><input class="inputs" type="number" name="price" id="food1price" placeholder="Price in Rs."></div>`
})