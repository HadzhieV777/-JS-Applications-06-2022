import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.querySelector("#root");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

const listTemplate = (data) => html`
  <ul>
    ${data.map(town => html`<li>${town}</li>`)}
  </ul>
`;

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const townsField = formData.get("towns");

  if (townsField != "") {
    const result = listTemplate(townsField.split(', '));
    render(result, root)
    form.reset();
  }
}
