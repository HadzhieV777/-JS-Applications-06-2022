import { deleteById, getById } from "../api/data.js";

const section = document.getElementById("detailsView");

export async function showDetails(context, id) {
  const idea = await getById(id);
  context.showSection(section);

  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user && user._id == idea._ownerId;

  section.innerHTML = createIdeaElement(idea, isOwner);
  if (isOwner) {
    section.document.querySelector('#deleteBtn').addEventListener("click", async (event) => {
      event.preventDefault();
      const choice = confirm("Are you sure you want to delete this idea?")
      if (choice) {
       await deleteById()
       ctx.goToPage('/catalog')
      }
    })
  }
}

function createIdeaElement(idea, isOwner) {
  let html = `
  <img class="det-img" src="${idea.img}" />
        <div class="desc">
          <h2 class="display-5">${idea.title}</h2>
          <p class="infoType">Description:</p>
          <p class="idea-description">
          ${idea.description}
          </p>
        </div>
        `;

  if (isOwner) {
    html += `<div class="text-center">
    <a id="deleteBtn" class="btn detb" href="">Delete</a>
  </div>`;
  }

  return html;
}

