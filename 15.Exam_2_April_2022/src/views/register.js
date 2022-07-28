import { html } from "../lib.js";
import { register } from "../api/api.js";

const registerTemplate = (onSubmit) => html`<section id="registerPage">
  <form class="registerForm" @submit=${onSubmit}>
    <img src="./images/logo.png" alt="logo" />
    <h2>Register</h2>
    <div class="on-dark">
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="repeatPassword">Repeat Password:</label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
      <span>If you have profile click <a href="#">here</a></span>
    </p>
  </form>
</section>`;

export function registerView(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repass = formData.get("repeatPassword");

    if (!password || !email) {
      return alert("All fields are required!");
    }

    if (password != repass) {
      return alert("Passwords don't match!");
    }

    await register(email, password);
    event.target.reset();
    ctx.setUserNav();
    ctx.page.redirect("/");
  }
}
