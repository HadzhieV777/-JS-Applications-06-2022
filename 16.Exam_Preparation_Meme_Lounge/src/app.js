import { page, render } from "./lib.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { catalogView } from "./views/catalog.js";
import { profileView } from "./views/profile.js";
import { registerView } from "./views/register.js";
import { getUserData } from "./utils.js";
import { logout } from "./api/users.js";

const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  create: "/create",
  edit: "/edit/:id",
  profile: "/profile",
  catalog: "/memes",
  details: "/memes/:id",
};

const main = document.querySelector("main");
document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page(routes.home, homeView);
page(routes.login, loginView);
page(routes.register, registerView);
page(routes.create, createView);
page(routes.edit, editView);
page(routes.profile, profileView);
page(routes.catalog, catalogView);
page(routes.details, detailsView);

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;

  next();
}

function renderMain(templateResult) {
  render(templateResult, main);
}

function updateNav() {
  const userData = getUserData();
  if (userData) {
    document.querySelector(".user").style.display = "block";
    document.querySelector(".guest").style.display = "none";
    document.querySelector(
      ".user span"
    ).textContent = `Welcome, ${userData.email}`;
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "block";
  }
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
