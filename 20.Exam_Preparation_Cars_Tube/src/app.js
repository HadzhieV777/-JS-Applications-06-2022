import { page } from "./lib.js";

import { addSession } from "./middlewares/session.js";
import { addRender } from "./middlewares/render.js";

import { homePage } from "./views/home.js";
import { dashboardPage } from "./views/dashboard.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { detailsPage } from "./views/details.js";
import { myListingsPage } from "./views/myListings.js";
import { sortPage } from "./views/sort.js";
import { logout } from "./api/users.js";

const endpoints = {
  // Common
  home: "/",
  dashboard: "/all-listings",

  // Auth
  login: "/login",
  register: "/register",
  logout: "/logout",

  // Listings
  sort: "/by-year",
  create: "/create",
  edit: "/edit/:id",
  details: "/details/:id",
  myListings: "/my-listings",
};

// Middlewares
page(addSession);
page(addRender);

// Pages
page(endpoints.home, homePage);
page(endpoints.dashboard, dashboardPage);
page(endpoints.login, loginPage);
page(endpoints.register, registerPage);
page(endpoints.logout, onLogout);
page(endpoints.sort, sortPage);
page(endpoints.create, createPage);
page(endpoints.edit, editPage);
page(endpoints.details, detailsPage);
page(endpoints.myListings, myListingsPage);

page.start();

function onLogout(ctx) {
  logout();
  ctx.page.redirect("/");
}
