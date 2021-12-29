const burger = document.querySelector('.hamburger');
const ac_btn = document.querySelectorAll('.account-btns');
const navRight = document.querySelector('.navbar-right');

burger.addEventListener('click', function () {
    // nav
    navRight.classList.toggle('resp-nav');
    // account - buttons
    ac_btn.forEach(btn => {
        btn.classList.toggle('btn-sm');
    });
    // rotation
    burger.classList.toggle('burger-rotate');
});