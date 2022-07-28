import { page, render } from "./lib.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { getUserData } from "./utils.js";
import { logout } from "./api/api.js";
import { detailsView } from "./views/details.js";

const root = document.querySelector("#content");

document.getElementById("logoutBtn").addEventListener("click", onLogout);

const routes = {
  home: "/",
  login: "/login",
  edit: "/edit/:id",
  dashboard: "/dashboard",
  details: "/details/:id",
  register: "/register",
  create: "/create-postcard",
};

page(decorateContext);
page(routes.home, homeView);
page(routes.login, loginView);
page(routes.edit, editView);
page(routes.dashboard, dashboardView);
page(routes.details, detailsView);
page(routes.register, registerView);
page(routes.create, createView);

setUserNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();

  next();
}

function setUserNav() {
  const user = getUserData();
  if (user) {
    document
      .querySelectorAll(".user")
      .forEach((x) => (x.style.display = "inline"));
    document
      .querySelectorAll(".guest")
      .forEach((x) => (x.style.display = "none"));
  } else {
    document
      .querySelectorAll(".user")
      .forEach((x) => (x.style.display = "none"));
    document
      .querySelectorAll(".guest")
      .forEach((x) => (x.style.display = "inline"));
  }
}

async function onLogout() {
  await logout();
  setUserNav();
  page.redirect("/");
}
