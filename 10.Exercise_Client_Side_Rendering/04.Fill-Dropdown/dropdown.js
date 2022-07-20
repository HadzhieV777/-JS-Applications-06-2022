import { html, render } from "../node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/dropdown";

const options = Object.values(await getData());
const menu = document.querySelector("#menu");

const selectTemplate = (data) => html`
  ${data.map((el) => html`<option value=${el._id}>${el.text}</option>`)}
`;

const form = document.querySelector("form");
form.addEventListener("submit", addItem);

update(options);


function update(options) {
  const result = selectTemplate(options);
  render(result, menu);
}

function addItem(event) {
  event.preventDefault();

  const text = form.querySelector("#itemText");
  if (text.value != "") {
    postData(text.value, options);
    text.value = "";
  }
}

async function getData() {
  const response = await fetch(url);
  return await response.json();
}

async function postData(text, options) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (response.ok) {
    options.push(await response.json());
    update(options);
  }
}
