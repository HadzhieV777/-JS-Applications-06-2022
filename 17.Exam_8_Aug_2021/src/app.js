import { logout } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./utils.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { userBooksView } from "./views/userBooks.js";

const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  create: "/create",
  edit: "/edit/:id",
  userBooks: "/my-books",
  details: "/details/:id",
};

const main = document.getElementById("site-content");
document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page(routes.home, homeView);
page(routes.login, loginView);
page(routes.register, registerView);
page(routes.create, createView);
page(routes.edit, editView);
page(routes.userBooks, userBooksView);
page(routes.details, detailsView);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateUserNav = updateUserNav;
  ctx.routes = routes

  next();
}

function renderMain(templateResult) {
  render(templateResult, main);
}

function updateUserNav() {
  const userData = getUserData();
  if (userData) {
    document.getElementById("user").style.display = "block";
    document.getElementById("guest").style.display = "none";
    document.querySelector(
      "#user span"
    ).textContent = `Welcome, ${userData.email}`;
  } else {
    document.getElementById("guest").style.display = "block";
    document.getElementById("user").style.display = "none";
  }
}

function onLogout() {
  logout();
  updateUserNav();
  page.redirect(routes.home);
}
