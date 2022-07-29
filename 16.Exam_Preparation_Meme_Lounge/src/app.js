import { page, render } from "./lib.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { catalogView } from "./views/catalog.js";
import { profileView } from "./views/profile.js";
import { registerView } from "./views/register.js";

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

page(decorateContext);
page(routes.home, homeView);
page(routes.login, loginView);
page(routes.register, registerView);
page(routes.create, createView);
page(routes.edit, editView);
page(routes.profile, profileView);
page(routes.catalog, catalogView);
page(routes.details, detailsView);

page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;

  next();
}

function renderMain(templateResult) {
  render(templateResult, main);
}
