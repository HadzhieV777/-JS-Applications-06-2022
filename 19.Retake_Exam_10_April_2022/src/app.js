import { page } from "./lib.js";

import { addSession } from "./middlewares/session.js";
import { addRender } from "./middlewares/render.js";

import { logout } from "./api/users.js";
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { myPostsPage } from "./views/myPosts.js";
import { registerPage } from "./views/register.js";

// import * as api from './api/api.js'
// window.api = api


const endpoints = {
  // Auth
  login: "/login",
  register: "/register",
  logout: "/logout",

  // Posts
  create: "/create",
  edit: "/edit/:id",
  details: "/details/:id",
  dashboard: "/",
  myPosts: "/my-posts",
};

// Middlewares
page(addSession);
page(addRender);

// Pages
page(endpoints.login, loginPage);
page(endpoints.register, registerPage);
page(endpoints.logout, onLogout);

page(endpoints.create, createPage);
page(endpoints.edit, editPage);
page(endpoints.details, detailsPage);
page(endpoints.dashboard, dashboardPage);
page(endpoints.myPosts, myPostsPage);

page.start();

function onLogout(ctx) {
  logout();
  ctx.page.redirect("/");
}
