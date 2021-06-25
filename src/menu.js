// DECLARATION DES VARIABLES
const menuBtn = document.querySelector("#menu__btn__box");


// // MENU FUNCTION
const mobile = 640;
const menu = menuBtn.parentNode.querySelector(".nav__right");

const showMenu = function () {
    if (menu.classList.contains('active__menu')) {
        menu.classList.remove('active__menu');
    } else { menu.classList.add('active__menu'); }
    
}

const hideMenu = function () {
    let width = window.innerWidth;

    if (width > mobile && menu.classList.contains('active__menu')) {
        menu.classList.remove('active__menu');
    }
}


// // EMITER FUNCTION

window.addEventListener('resize', hideMenu);
menuBtn.addEventListener('click', showMenu);

