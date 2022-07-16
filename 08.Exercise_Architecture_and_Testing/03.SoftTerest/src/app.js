// import * as api from "./api/api.js";

const main = document.querySelector("main");

const homeView = document.getElementById("homeView");
const registerView = document.getElementById("registerView");
const loginView = document.getElementById("loginView");
const catalogView = document.getElementById("dashboard-holder");
const detailsView = document.getElementById("detailsView");
const createView = document.getElementById("createView");

const paths = {
  "/": homeView,
  "/register": registerView,
  "/login": loginView,
  "/catalog": catalogView,
  "/details": detailsView,
  "/create": createView,
};

window.showSection = () => {
  main.appendChild(homeView);
};
