import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

import * as api from './api/data.js'
window.api = api
  

const root = document.querySelector("div.container");

page(decorateContext); // This will run before each page, meaning every page bellow will have the context
page("/", catalogPage);
page("/details/:id", detailsPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/login", loginPage);
page("/register", registerPage);
page("/my-furniture", catalogPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);

  //  if (!next()) this middleware will block the rest (if any other middlewares)
  next();
}

/*
  What Is Middleware?

- A request handler with access to the application's request-response cycle is known as middleware. 
- A function that holds the request object, the response object, and the middleware function.
- Middleware can also send the response to the server before the request. 
- The next middleware function is commonly represented as a variable named next.
- Simply middleware is a function that can only be applied using routes. 
- We can access and modify request and response data using middleware.
*/
