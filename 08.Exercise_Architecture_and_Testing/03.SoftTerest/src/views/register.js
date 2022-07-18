import { register } from "../api/users.js";

const section = document.getElementById("registerView");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = null;

export function showRegister(context) {
  ctx = context;
  context.showSection(section);
}

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");
  const repass = formData.get("repeatPassword");

  await register(email, password, repass);
  
  form.reset();
  ctx.updateNav();
  ctx.goToPage("/");
}