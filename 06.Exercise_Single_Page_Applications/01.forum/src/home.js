import { showDetails } from "./details.js";
import { createPostPreview } from "./utils.js";

const section = document.getElementById("homeView");
section.querySelector("div.topic-title").addEventListener("click", showDetails);
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);
section.querySelector('[name="cancel"]').addEventListener("click", clearForm);
const container = section.querySelector(".topic-container");

section.remove();

export async function showHome(ev) {
  // Check if there is ev, 'ev && ev === ev?'
  ev?.preventDefault();

  document.querySelector("main").replaceChildren("Loading...");

  const response = await fetch(
    "http://localhost:3030/jsonstore/collections/myboard/posts"
  );
  const posts = await response.json();

  // Spread required because map() returns an Array, but
  // replaceChildren() expect to recieve series of individual elements
  container.replaceChildren(...Object.values(posts).map(createPostPreview));

  document.querySelector("main").replaceChildren(section);
}

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const title = formData.get("topicName").trim();
  const username = formData.get("username").trim();
  const content = formData.get("postText").trim();

  try {
    if (title == "" || username == "" || content == "") {
      throw new Error("All fields are required!");
    }

    const response = await fetch(
      "http://localhost:3030/jsonstore/collections/myboard/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          username,
          content,
          dateCreated: new Date(),
        }),
      }
    );

    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    clearForm();
    showHome();
  } catch (e) {
    alert(e.message);
  }
}

function clearForm() {
  form.reset();
}
