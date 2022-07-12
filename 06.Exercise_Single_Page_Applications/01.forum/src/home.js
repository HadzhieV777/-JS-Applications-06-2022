import { showDetails } from "./details.js";

const section = document.getElementById("homeView");
section.querySelector("div.topic-title").addEventListener("click", showDetails);
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

section.remove();

export function showHome(ev) {
  // Check if there is ev, 'ev && ev === ev?'
  ev?.preventDefault();
  document.querySelector("main").replaceChildren(section);
}

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  console.log(...formData.entries())
}
