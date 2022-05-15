const login = document.querySelector('.login');
const signup = document.querySelector('.signup');

const loginSection = document.querySelector('.login-section');
const signupSection = document.querySelector('.signup-section');

const modeSelectorHeaderLogin = document.querySelector('.mode-heading-login');
const modeSelectorHeaderSignup = document.querySelector('.mode-heading-signup');


login.style.backgroundColor = '#96dee9';
function fun1(){
    login.classList.value ='login col-6 bg-selected font-bold';
    signup.classList.value= 'signup col-6';
    loginSection.classList.remove('display-hide');
    signupSection.classList.add('display-hide');
    login.style.backgroundColor = '#96dee9';
    signup.style.backgroundColor = '#FFEF82';
}
function fun2(){
    login.classList.value ='login col-6';
    signup.classList.value= 'signup col-6 bg-selected font-bold';
    loginSection.classList.add('display-hide');
    signupSection.classList.remove('display-hide');
    login.style.backgroundColor = '#E8F9FD';
    signup.style.backgroundColor = '#f3db63';
}
login.addEventListener('click', fun1);
signup.addEventListener('click', fun2);