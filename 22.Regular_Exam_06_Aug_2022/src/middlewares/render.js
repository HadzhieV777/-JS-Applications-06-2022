import { render, html } from "../lib.js";

const navTemplate = (user) => html`<a id="logo" href="/"
    ><img id="logo-img" src="./images/logo.jpg" alt=""
  /></a>

  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
    </div>
    ${user
      ? html` <div class="user">
          <a href="/create">Create Offer</a>
          <a href="/logout">Logout</a>
        </div>`
      : html` <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>`;

const header = document.querySelector(".my-header");
const root = document.querySelector("main");

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), header);
  ctx.render = ctxRender;

  next();
}
