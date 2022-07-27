import { page, render } from "./lib.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { navigationView } from "./views/nav.js";
import { registerView } from "./views/register.js";

const headerElement = document.querySelector("header");
const root = document.getElementById("content");


page(decorateContext);
page("/", homeView);
page("/login", loginView);
page("/edit", editView);
page("/dashboard", dashboardView);
page("/register", registerView);
page("/create", createView);
//  logout

updateUserNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateUserNav = updateUserNav

  next();
}

function updateUserNav() {
  render(navigationView(), headerElement);
}
