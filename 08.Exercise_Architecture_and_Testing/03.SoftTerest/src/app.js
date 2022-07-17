import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/homepage.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { initialize } from "./router.js";

document.getElementById("views").remove();

const urls = {
  "/": showHome,
  "/register": showRegister,
  "/login": showLogin,
  "/catalog": showCatalog,
  "/details": showDetails,
  "/create": showCreate,
};

const router = initialize(urls);

// Start app in home view
router.goToPage("/");
