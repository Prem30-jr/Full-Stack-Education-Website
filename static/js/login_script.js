const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

// Switch to Sign-up form
signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Switch back to Sign-in form
signInBtnLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

