import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/homepage.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { initialize } from "./router.js";
import { logout } from "./api/users.js";

document.getElementById("views").remove();

const urls = {
  "/": showHome,
  "/register": showRegister,
  "/login": showLogin,
  "/catalog": showCatalog,
  "/details": showDetails,
  "/create": showCreate,
  '/logout': onLogout,
};

const router = initialize(urls);
router.updateNav();

// Start app in home view
router.goToPage("/");


function onLogout() {
  logout()
  router.updateNav()
  router.goToPage('/')
}