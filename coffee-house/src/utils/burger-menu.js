const body = document.querySelector('.body'),
    burgerMenu = document.querySelector('.burger'),
    menuNav = document.querySelector('.nav-menu'),
    navLink = document.querySelectorAll('.nav-link');

function toggleClasses() {
    burgerMenu.classList.toggle('active');
    menuNav.classList.toggle('active');
    body.classList.toggle('active');
}

burgerMenu.addEventListener('click', toggleClasses);

navLink.forEach((el) => {
    el.addEventListener('click', ()=> {
        if(body.classList.contains('active'))toggleClasses()});
});
