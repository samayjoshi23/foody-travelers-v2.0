const update = document.querySelector('.update');
const journey = document.querySelector('.journey');

const updateSection = document.querySelector('.update-section');
const journeySection = document.querySelector('.journey-section');

const modeSelectorHeaderUpdate = document.querySelector('.mode-heading-update');
const modeSelectorHeaderJourney = document.querySelector('.mode-heading-journey');


update.style.backgroundColor = '#96dee9';
journey.style.backgroundColor = '#FFEF82';
function fun1() {
    update.classList.value = 'update bg-selected font-bold';
    journey.classList.value = 'journey';
    updateSection.classList.remove('display-hide');
    journeySection.classList.add('display-hide');
    update.style.backgroundColor = '#96dee9';
    journey.style.backgroundColor = '#FFEF82';
}
function fun2() {
    update.classList.value = 'update';
    journey.classList.value = 'journey bg-selected font-bold';
    updateSection.classList.add('display-hide');
    journeySection.classList.remove('display-hide');
    update.style.backgroundColor = '#E8F9FD';
    journey.style.backgroundColor = '#f3db63';
}
update.addEventListener('click', fun1);
journey.addEventListener('click', fun2);