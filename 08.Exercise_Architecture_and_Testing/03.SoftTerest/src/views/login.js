import { login } from "../api/users.js";

const section = document.getElementById("loginView");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = null;

export function showLogin(context) {
  // when showLogin, assign context to ctx, to be available for onSubmit
  ctx = context;
  context.showSection(section);
}

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  await login(email, password);
  
  form.reset();
  ctx.updateNav();
  ctx.goToPage("/");
}
