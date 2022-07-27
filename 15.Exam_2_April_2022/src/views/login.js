import { html } from "../lib.js";
import {login} from '../api/api.js'

const loginTemplate = (onSubmit) => html` <section id="loginPage">
  <form class="loginForm" @submit=${onSubmit}>
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>

    <div>
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>

    <div>
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
      <span>If you don't have profile click <a href="#">here</a></span>
    </p>
  </form>
</section>`;

export function loginView(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    try {
      await login(email, password);
      ctx.updateUserNav();
      event.target.reset();
      ctx.page.redirect("/");
    } catch (error) {
      update(error.message);
    }
  }
}
