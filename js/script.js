"use strict";
import buttons from './modules/buttons';
window.addEventListener('DOMContentLoaded',()=>{
    buttons({
        startBtn: '[data-start]',
        flipBtn:'[data-flip]',
        knowBtn:'[data-k]',
        dknowBtn:'[data-dk]',
        retryBtn:'[data-retry]',
        restartBtn:'[data-restart]',
        remainigBtn: '[data-remainig]'
    });
});