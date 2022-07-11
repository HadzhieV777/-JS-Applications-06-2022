import { hideMonthsView, hideDaysView,  } from "./utils.js";
import {handleTargets} from './main.js'

const body = document.querySelector('body');

// Show only years view on loading
hideMonthsView();
hideDaysView();


// Handle clicking trough tables
body.addEventListener('click', (e) => {
    if (typeof handleTargets[e.target.nodeName] == 'function') {
        handleTargets[e.target.nodeName](e.target);
    }
})


