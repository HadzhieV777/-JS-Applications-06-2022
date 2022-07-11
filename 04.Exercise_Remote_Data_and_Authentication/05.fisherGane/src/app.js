import { checkUserNav, onLogout } from "./utils.js";
checkUserNav();

const logoutButton = document.querySelector('#logout').addEventListener('click', onLogout)

