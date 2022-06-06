// for accordion

const accordion_headers = document.querySelectorAll(".accordion-card-header");

accordion_headers.forEach((accordion_header) => {
  accordion_header.addEventListener("click", (event) => {
    accordion_header.classList.toggle("active");
  });
});

// For Hotel Section
const HotelIcons = document.querySelectorAll(".hotel-icon");

HotelIcons.forEach((HotelIcon) => {
  HotelIcon.addEventListener("click", (event) => {
    HotelIcon.nextElementSibling.classList.toggle("show-hotels");
  });
});

//For food counter
const AllMinus = document.querySelectorAll(".minus");
const AllPlus = document.querySelectorAll(".plus");
AllMinus.forEach((minus) => {
  minus.addEventListener("click", (event) => {
    let qty = minus.nextElementSibling.innerHTML;
    if (qty > 0) {
      minus.nextElementSibling.innerHTML = --qty;
    }
  });
});
AllPlus.forEach((plus) => {
  plus.addEventListener("click", (event) => {
    let qty = plus.previousElementSibling.innerHTML;
    if (qty < 7) {
      plus.previousElementSibling.innerHTML = ++qty;
    }
  });
});

let foodCounts = document.querySelectorAll("#foodCounter");
let foodTotal = 0,
  totalFoodPackage = 0;

let bookingButton = document.querySelector(".booking-btn");

function bookButton(){
  let foodList = [];
    let fName, fPrice, fQty, foodTotalCost=0;

    foodCounts.forEach((count) => {
      if (count.innerText > 0) {
        fPrice = count.parentElement.previousElementSibling.lastElementChild.firstElementChild.lastElementChild.firstElementChild.innerText;
        fName = count.parentElement.previousElementSibling.lastElementChild.firstElementChild.firstElementChild.innerText
        fQty = count.innerText
        foodTotalCost = parseInt(fPrice) * parseInt(fQty);
        totalFoodPackage += foodTotalCost;
        let food = {
          name: fName,
          Price: fPrice,
          Qty: fQty,
          TotalCost: foodTotalCost,
        };
        foodList.push(food);
        foodTotalCost = 0;
      }
    });

    sessionStorage.setItem('totalFoodPackage',totalFoodPackage);
    sessionStorage.setItem('foodObj', JSON.stringify(foodList));
}

bookingButton.addEventListener("click", bookButton);