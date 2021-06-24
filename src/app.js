"use strict";

// DECLARATION DES VARIABLES

const slider = document.querySelector('.caroussel');
const slideItems = [].slice.call(document.querySelectorAll('.img__box'));
const slideItemsLength = slideItems.length;
const prevBtn = document.querySelector("#slide__btn__left >  span");
const nextBtn = document.querySelector("#slide__btn__right >  span");


// FORMULAIRE VARIABLE

const form = document.querySelector('#form');
const formSelect = document.querySelector('#form #select');
const fields = document.querySelectorAll('#form .field');
const formCheck = document.querySelector('#confirmation');
const formSubmit = document.querySelector('#submit');
const formReset = document.querySelector('#clear');




// =============== CAROUSSEL FUNCTION ================
let count = 0;

if (count == 0) {
    prevBtn.style.display = 'none';
}

if (count == (slideItemsLength - 1)) {
    nextBtn.style.display = 'none';
}


// ============= PREVSLIDER ============
const prevSlide = function () {
    slideItems[count].classList.remove('active');
    if (count > 0) {
        count--;
        nextBtn.style.display = 'inline-block';
        console.log(count)
    
        if (count === 0) {
            prevBtn.style.display = 'none';
        }
        
    } else {
        count = (slideItemsLength - 1);
        nextBtn.style.display = 'none';
    }

    slideItems[count].classList.add('active');
}

// ============= NEXTSLIDER ============
const nextSlide = function () {
    slideItems[count].classList.remove('active');
    if (count < (slideItemsLength - 1)) {
        count++;
        prevBtn.style.display = 'inline-block';

        if (count === (slideItemsLength - 1)) {
            nextBtn.style.display = 'none';
        } 
        
    } else {
        count = 0;
        prevBtn.style.display = 'none';
    }

    slideItems[count].classList.add('active');
}


// ============ KEYSLIDER ===============
const keySlide = function (e) {
    if (e.keyCode == '37') {
        prevSlide();
    }

    if(e.keyCode == '39') {
        nextSlide();
    }
}


// ============ AUTOMATESLIDER =============
const automateSlide = function () {
    if (slideItems[count].classList.contains('active')) {
        slideItems[count].classList.remove('active');
    }

    if (count < (slideItemsLength - 1)) {
        count++;
        prevBtn.style.display = 'inline-block';

        if (count === (slideItemsLength - 1)) {
            nextBtn.style.display = 'none';
        }

    } else {
        count = 0;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
    }

    slideItems[count].classList.add('active');

}



// ============ VERIFIE FIELDS =============
const verifyFields = function () {
    let valide = false;

    fields.forEach(field => {
    
        field.addEventListener('input', function () {
            let alert = field.parentNode.querySelector(".input__box .alert");
             
            if(!this.value.trim()) {
                if (alert.classList.contains('success')) {
                    alert.classList.remove('success');
                }
                this.setAttribute("validate", valide);
                return;
            } else if (this.value.trim() && this.value.trim().length < 5) {
                this.setAttribute("validate", valide);
                return;
            } else if (this.value.trim() && this.value.trim().length > 5) {
                alert.classList.add('success');
                this.setAttribute("validate", !valide);
            }
        });

    }) 

    formCheck.onchange =  function () {
        if (formCheck.checked) {
            formSubmit.disabled = false;
        } else { 
            formSubmit.disabled = true;
            return;
        }
    }

}




// ============ EMITER FUNCTION ============    

// ============ CARROUSEL ============
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
document.addEventListener('keydown', keySlide);


const stopSlide = window.setInterval(automateSlide, 5000);
slideItems.forEach (slide => {
    let slideImg = slide.querySelector('.slide__img');
    slideImg.onmouseover =  function () {
        window.clearInterval(stopSlide);
    } 

    slideImg.onmouseout = () => window.setInterval(automateSlide, 5000);
})



// ============ FORMULAIRE ============
verifyFields();

form.addEventListener('submit', (e) => {
    [].slice.call(fields).forEach(field => {
        if (field.value === ""){
            e.preventDefault();
            console.log('invalide');
            return false;
        } else { 
            e.preventDefault();
            const msgConfirm = document.querySelector('#msg__systeme__box');
            msgConfirm.style.display = 'block';
            return true;
        }
    }) 
    
});
