"use strict";

// class Carousel {

//     /**
//      * @param {HTMLelement} elementHtml 
//      * @param {Object} carousselOptions 
//      * @param {Object} carousselOptions.slidesToScroll - Nombre d'élément à faire défiler. 
//      * @param {Object} carousselOptions.slidesVisible - Nombre d'élément visible dans le slide.
//      */
//     constructor (elementHtml, carousselOptions = {}) {
//         this.element = elementHtml;
//         this.carousselOptions = Object.assign({}, {
//             slidesToScroll: 1,
//             slidesVisible: 1,
//         }, carousselOptions)
        
//         let children = [].slice.call(elementHtml.children);
//         let ratio = this.children.length / this.carousselOptions.slidesVisible;
//         let root = this.createDivWithClass('caroussel');
//         this.container = this.createDivWithClass('caroussel__container');
        
//         root.appendChild(this.container);
//         this.element.appendChild(root);

//         this.items = children.map(child => {
//             let item = this.createDivWithClass('caroussel__item');
//             item.appendChild(child);
//             this.container.appendChild(item);
//             return item;
//         });

//         this.setStyle();
        
//     }


//     /**
//      * @param {string} className - Crée un élément HTML avec style
//      * @returns {HTMLElement}
//      */
//     createDivWithClass (className) {
//         let div = document.createElement('div');
//         div.setAttribute('class', className);
//         return div;
//     }


//     /**
//      * @param {}
//      */

//     setStyle () {
//         let ratio = this.children.length / this.carousselOptions.slidesVisible;
//         this.container.style.width = (ratio * 100) + '%';
//         this.items.forEach(item => item.style.width = ((100 / this.carousselOptions.slidesVisible ) / ratio) + '%');
//     }
// };

// new Carousel(document.querySelector("#caroussel1"), {
//     slidesToScroll: 3,
//     slidesVisible: 3,
// });