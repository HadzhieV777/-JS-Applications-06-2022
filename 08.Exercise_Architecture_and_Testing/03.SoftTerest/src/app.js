import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/homepage.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

const main = document.querySelector("main");
document.getElementById("views").remove();

document.querySelector("nav").addEventListener("click", onNavigate);

const urls = {
  "/": showHome,
  "/register": showRegister,
  "/login": showLogin,
  "/catalog": showCatalog,
  "/details": showDetails,
  "/create": showCreate,
};

const context = {
  showSection,
};

function showSection(section) {
  main.replaceChildren(section);
}

function onNavigate(event) {
  let target = event.target;
  if (target.tagName == "IMG") {
    target = target.parentElement;
  }

  if (target.tagName == "A") {
    event.preventDefault();
    const url = new URL(target.href);
    const handler = urls[url.pathname];
    
    if (typeof handler == "function") {
      handler(context);
    }
  }
}
