/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/buttons.js":
/*!*******************************!*\
  !*** ./js/modules/buttons.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./js/modules/cards.js");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources */ "./js/modules/resources.js");


let known=0;
let dknown=0;
function buttons({startBtn,flipBtn,knowBtn,dknowBtn,retryBtn,restartBtn,remainigBtn}){
//Adding cards
 function addCards(){
    document.querySelector('.quote').innerHTML=``;
    (0,_resources__WEBPACK_IMPORTED_MODULE_1__.getResources)('http://localhost:3000/words')
    .then( data=>{
    max = data.length-1;
    console.log(max);
    let rand = (0,_resources__WEBPACK_IMPORTED_MODULE_1__.generateArrayRandomNumber)(0,max);
    for(let i = 0; i<max;i++){
      let {rus,jap} = data[rand[i]];
      const card =  document.createElement('div');
      card.classList.add('card');
      card.innerHTML=`<div class="front">${jap}</div>
      <div class="back hide">${rus}</div>`;
      document.querySelector('.quote').append(card);
    }
    cards = document.querySelectorAll('.card');
    frontCards = document.querySelectorAll('.front');
    backCards = document.querySelectorAll('.back');
    });
}
let cards,frontCards,backCards;
let max;
let knownC;
let dknownC;    
        // Last cards
const startButton = document.querySelector(startBtn);
const flipButton = document.querySelector(flipBtn);
const knowButton =document.querySelector(knowBtn);
const dknowButton = document.querySelector(dknowBtn);
const retryButton = document.querySelector(retryBtn);
const restartButton = document.querySelector(restartBtn);
const remainigButton = document.querySelector(remainigBtn);
let cur=0;
addCards();
startButton.addEventListener('click',()=>{
        cards[cur].style.display='block';
        max =(0,_cards__WEBPACK_IMPORTED_MODULE_0__.changeRemainig)(remainigButton,max,cur);
    });

    flipButton.addEventListener('click',()=>{
            if(frontCards[cur].classList.contains('hide')){
                frontCards[cur].classList.remove('hide');
                backCards[cur].classList.add('hide');
            }
            else{
                backCards[cur].classList.remove('hide');
                frontCards[cur].classList.add('hide');
            }
    });

    knowButton.addEventListener('click',()=>{
    known++;
    if(cur!=max-1){
    cards[cur].style.display='none';
    cur++;
    cards[cur].style.display='block';
    max =(0,_cards__WEBPACK_IMPORTED_MODULE_0__.changeRemainig)(remainigButton,max,cur);
    knownC=1;
    dknownC=0;
    console.log(known);

    }
    else{
        if(known>localStorage.getItem('BestKnown', known)){
            localStorage.setItem('BestKnown', known);
        }
        modal('.modal');
    }
});

dknowButton.addEventListener('click',()=>{
    dknown++;
    if(cur!=max-1){
    cards[cur].style.display='none';
    cur++;
    cards[cur].style.display='block';
    max = (0,_cards__WEBPACK_IMPORTED_MODULE_0__.changeRemainig)(remainigButton,max,cur);
    knownC=0;
    dknownC=1;
    }
    else{
        if(known>localStorage.getItem('BestKnown', known)){
            localStorage.setItem('BestKnown', known);
        }
        modal('.modal');
    }

});

retryButton.addEventListener('click',()=>{
    if(cur!=0){
        cards[cur].style.display='none';
        cur--;
        cards[cur].style.display='block';
        if(knownC==1){
            known--;
        }else{
            dknown--;
        }
        max =(0,_cards__WEBPACK_IMPORTED_MODULE_0__.changeRemainig)(remainigButton,max,cur);

    }
});
function restart(){
    addCards();
    known=0;
    dknown=0;
    cards[cur].style.display='none';
    cards[0].style.display='block';
    modal('.modal');
    max =(0,_cards__WEBPACK_IMPORTED_MODULE_0__.changeRemainig)(remainigButton,max,cur);
}
restartButton.addEventListener('click',restart);
function openModal(modalSelector){
    const  modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove('hide');
    document.body.style.overflow='hidden';
}
function closeModal(modalSelector){
    const  modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove('show');
    document.body.style.overflow='';
}
function modal(modalSelector){
    
    const modal = document.querySelector(modalSelector);
    modal.innerHTML=`
    <div class="modal__dialog">
        <div class="modal__content">
            <form action="#">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">Last attemp you:</div>
                <p class="learned">Learned ${known} </p>
                <p class="dlearned">Didn't learnded ${dknown} </p>
                <p class="best__result">Best result is: ${localStorage.BestKnown} learned words: </p>
                <button data-btntry class="btn btn_dark btn_min">Try again</button>
            </form>
        </div>
    </div>`;
    
    openModal(modalSelector);
    modal.addEventListener('click',(e)=>{
        if(e.target===modal || e.target.getAttribute('data-close')==""){
            closeModal(modalSelector);
        }
        
    });

    document.addEventListener('keydown',(e)=>{
    if(e.code==='Escape' &&modal.classList.contains('show')){
        closeModal(modalSelector);
    } 
    });

    document.querySelector('[data-btntry]').addEventListener('click',(e)=>{
        e.preventDefault();
        closeModal(modalSelector);
        known=0;
        dknown=0;
        cards[cur].style.display='none';
        cur=0;
        cards[cur].style.display='block';
        (0,_cards__WEBPACK_IMPORTED_MODULE_0__.changeRemainig)(remainigButton,max,cur);

    });

}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buttons);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeRemainig": () => (/* binding */ changeRemainig)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resources */ "./js/modules/resources.js");

function changeRemainig(remainig,max,cur, i=0){
    (0,_resources__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:3000/words');
        remainig.textContent=`Remainig cards ${(max-cur)+i}`;
    return max;
}


/***/ }),

/***/ "./js/modules/resources.js":
/*!*********************************!*\
  !*** ./js/modules/resources.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateArrayRandomNumber": () => (/* binding */ generateArrayRandomNumber),
/* harmony export */   "getResources": () => (/* binding */ getResources)
/* harmony export */ });
 //Resources
    // getting resources from db
    const getResources = async(url)=>{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`We can't fetch ${url},status ${res.status}`);
        }
        return await res.json();
    };
    //Random numbers
    function generateArrayRandomNumber (min, max) {
        let totalNumbers = max - min + 1,
            arrayTotalNumbers = [],
            arrayRandomNumbers = [],
            tempRandomNumber;
    
        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }
    
        while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }
    
        return arrayRandomNumbers;
    }
    
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_buttons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/buttons */ "./js/modules/buttons.js");


window.addEventListener('DOMContentLoaded',()=>{
    (0,_modules_buttons__WEBPACK_IMPORTED_MODULE_0__["default"])({
        startBtn: '[data-start]',
        flipBtn:'[data-flip]',
        knowBtn:'[data-k]',
        dknowBtn:'[data-dk]',
        retryBtn:'[data-retry]',
        restartBtn:'[data-restart]',
        remainigBtn: '[data-remainig]'
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map