"use strict";

// DECLARATION DES VARIABLES

const slider = document.querySelector('.caroussel');
const prevBtn = document.querySelector("#slide__btn__left >  span");
const nextBtn = document.querySelector("#slide__btn__right >  span");
const closeBtn = document.querySelector("#close__msg");

const slideBtnContainer = [].slice.call(document.querySelectorAll(".slide__btn"));
const slideItems = [].slice.call(document.querySelectorAll('.img__box'));
const slideItemsLength = slideItems.length;


// FORMULAIRE VARIABLE

const form = document.querySelector('#form');
const fromBody = document.querySelector('#form__body');
const formSelect = document.querySelector('#form #select');
const formFields = document.querySelectorAll('#form .field');
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
const handlePrevSlide = function () {
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
const handleNextSlide = function () {
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
const handleKeySlide = function (e) {
    if (e.keyCode == '37') {
        prevSlide();
    }

    if(e.keyCode == '39') {
        nextSlide();
    }
}


// ============ AUTOMATESLIDER =============
const handleAutomateSlide = function () {
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
const handleVerifyFields = function () {
    let valide = false;

    formFields.forEach(field => {
    
        field.addEventListener('input', function () {
            let alert = this.parentNode.parentNode.querySelector(".input__box .alert");
             
            if(!this.value.trim()) {
                if (alert.classList.contains('success')) {
                    alert.classList.remove('success');
                }
                alert.classList.remove('success');
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


// ============ CLOSE ELEMENTS ============
const handleCloseBtn = function () {
    this.parentNode.parentNode.style.display = 'none';
}



// ============ RESET FIELDS ============
const handleResetFields = function () {
    formFields.forEach(field => {
        let alert = field.parentNode.parentNode.querySelector(".input__box .alert");
        field.value = "";

        if (alert.classList.contains('success')) {
            alert.classList.remove('success');
        };
    });
    formCheck.checked = false;
}


const handleClearFields = function () {
    formFields.forEach(field => {
        let alert = field.parentNode.parentNode.querySelector(".input__box .alert");
        
        if (alert.classList.contains('success')) {
            alert.classList.remove('success');
        }
    });
    formCheck.checked = false;
}

const handleSelectedDocument = function () {
    const value = this.options[this.selectedIndex].value;
    let active = false;

    if (!value || value == "defaultOption") {
        active = false;
        return;
    } else {
        fromBody.style.display = 'grid';
        fromBody.setAttribute('active', !active);
    }
}


// ============ EMITER FUNCTION ============ 









// ============ CLOSE MSG ============
closeBtn.addEventListener('click', handleCloseBtn);


// ============ CARROUSEL ============
const stopSlide = window.setInterval(handleAutomateSlide, 5000);
prevBtn.addEventListener('click', handlePrevSlide);
nextBtn.addEventListener('click', handleNextSlide);
document.addEventListener('keydown', handleKeySlide);

// slideBtnContainer.forEach(slideBtn => {
//     slideBtn.onmouseover = function () {
//         window.clearInterval(stopSlide);
//     };
// })
// prevBtn.addEventListener('mouseover', function () {
//     window.clearInterval(stopSlide);
// });
// nextBtn.addEventListener('mouseover', function () {
//     window.clearInterval(stopSlide);
// });


slideItems.forEach (slide => {
    let slideImg = slide.querySelector('.slide__img');

    slideImg.onmouseover =  function () {
        window.clearInterval(stopSlide);
    } 
    slideImg.onmouseout = function () {
        window.setInterval(handleAutomateSlide, 5000);
    }
})


// ============ FORMULAIRE ============

formSelect.addEventListener('change', handleSelectedDocument);
formReset.addEventListener('click', handleClearFields)
handleVerifyFields();


form.addEventListener('submit', function (e) {
    const validate = [].slice.call(formFields).every(field => field.getAttribute('validate') === "true");

    if (!validate) {
        e.preventDefault();
        return false;
    } else { 
        e.preventDefault();
        const msgConfirm = document.querySelector('#msg__systeme__box');
        msgConfirm.style.display = 'block';
        
        handleResetFields();
        return true;
    }
});



