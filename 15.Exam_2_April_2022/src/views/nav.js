import { html } from "../lib.js";
import { getUserData } from "../utils.js";

const userData = getUserData()

const userNav = html`<li><a href="/create">Create Postcard</a></li>
  <li><a href="javascript:void(0)">Logout</a></li>`;

const guestNav = html`<li><a href="/login">Login</a></li>
  <li><a href="/register">Register</a></li>`;

const navigationTemplate = () => html`
  <nav>
  <section class="logo">
          <img src="./images/logo.png" alt="logo" />
        </section>
        <ul>
          <!--Users and Guest-->
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          ${userData ? userNav : guestNav}
    <ul>

    </ul>
  </nav>
`;

export function navigationView() {
  return navigationTemplate();

}
