import { page, render } from "./lib.js";
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

page(decorateContext);
page(routes.home, homeView);
page(routes.login, loginView);
page(routes.register, registerView);
page(routes.create, createView);
page(routes.edit, editView);
page(routes.userBooks, userBooksView);
page(routes.details, detailsView);

page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  //   ctx.updateNav = updateNav;

  next();
}

function renderMain(templateResult) {
  render(templateResult, main);
}
