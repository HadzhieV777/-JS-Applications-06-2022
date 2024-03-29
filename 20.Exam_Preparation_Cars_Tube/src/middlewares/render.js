import { render, html } from "../lib.js";

const navTemplate = (user) => html` <nav>
  <a class="active" href="/">Home</a>
  <a href="/all-listings">All Listings</a>
  <a href="/by-year">By Year</a>
  ${user
    ? html`<div id="profile">
        <a>Welcome ${user.username}</a>
        <a href="/my-listings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="/logout">Logout</a>
      </div>`
    : html` <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`}
</nav>`;

const header = document.querySelector(".my-header");
const root = document.getElementById("site-content");

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), header);
  ctx.render = ctxRender;

  next();
}
