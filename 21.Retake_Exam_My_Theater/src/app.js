import { page } from "./lib.js";

import { addSession } from "./middlewares/session.js";
import { addRender } from "./middlewares/render.js";

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { detailsPage } from "./views/details.js";
import { profilePage } from "./views/profile.js";
import { logout } from "./ api/users.js";

const endpoints = {
  // Common
  home: "/",

  // Auth
  login: "/login",
  register: "/register",
  logout: "/logout",

  // Listings
  create: "/create",
  edit: "/edit/:id",
  details: "/details/:id",
  profile: "/profile",
};

// Middlewares
page(addSession);
page(addRender);

// Pages
page(endpoints.home, homePage);
page(endpoints.login, loginPage);
page(endpoints.register, registerPage);
page(endpoints.logout, onLogout);
page(endpoints.create, createPage);
page(endpoints.edit, editPage);
page(endpoints.details, detailsPage);
page(endpoints.profile, profilePage);

page.start();

function onLogout(ctx) {
  logout();
  ctx.page.redirect("/");
}
