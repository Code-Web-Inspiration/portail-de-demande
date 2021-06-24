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


(() => {


    // CAROUSSEL FUNCTION
    let count = 0;

    if (count == 0) {
        prevBtn.style.display = 'none';
    }

    if (count == (slideItemsLength - 1)) {
        nextBtn.style.display = 'none';
    }

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

    const keySlide = function (e) {
        if (e.keyCode == '37') {
            prevSlide();
        }

        if(e.keyCode == '39') {
            nextSlide();
        }
    }

    const automateSlide = function () {

        return window.setInterval(function () {
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
            
        }, 5000);
    }



    // EMITER FUNCTION
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    document.addEventListener('keydown', keySlide);
    automateSlide();

    slideItems.forEach (slide => {
        slide.addEventListener('mouseenter', () => clearInterval(automateSlide));
    })

    

    // --- VALIDATION FORMULAIRE ---

    const verifyFields = function () {
        let validate = false;

        fields.forEach(field => {
        
            field.addEventListener('input', function () {
                let alert = field.parentNode.querySelector(".input__box .alert");
                 
                if(!this.value.trim()) {
                    if (alert.classList.contains('success')) {
                        alert.classList.remove('success');
                        validate = false;
                    }
                    validate = false;
                    return;
                } else if (this.value.trim() && this.value.trim().length < 5) {
                    validate = false;
                    return;
                } else {
                    alert.classList.add('success');
                    validate = true;
                }
            })

            if (!field.value.trim()) {
                validate = false;
            } else if (this.value.trim() && this.value.trim().length > 5) {
                validate = true;
            } 
        });


        console.log(formSubmit.disabled)

        if (validate && formCheck.checked) {
            formSubmit.disabled = true;
        }

    }


    verifyFields();

    const handleSubmit = (e) => {
        // e.preventDefault();
        // verifyFields();
        
        formSubmit.style.backgroundColor = "black";
        alert('formulaire envoyé');

    }

    verifyFields
    form.addEventListener('submit', handleSubmit)

})()