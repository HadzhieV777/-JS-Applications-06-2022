import { page } from "./lib.js";
import { addRender } from "./middlewares/render.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

// import * as api from './api/api.js'
// window.api = api


const routes = {
  home: "/",
  catalog: "/catalog",
  login: "/login",
  register: "/register",
  create: "/create",
  details: "/details/:id",
  edit: "/edit/:id",
};

page(addRender);

page(routes.home, homePage);
page(routes.catalog, catalogPage);
page(routes.login, loginPage);
page(routes.register, registerPage);
page(routes.create, createPage);
page(routes.details, detailsPage);
page(routes.edit, editPage);

page.start();
