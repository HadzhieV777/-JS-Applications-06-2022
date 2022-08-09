import { deleteTheater, getById } from "../ api/theaters.js";
import { getLikesById, getUserLikes, sendLike } from "../ api/likes.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (theater, isOwner, onDelete, onLike) => html` <section
  id="detailsPage"
>
  <div id="detailsBox">
    <div class="detailsInfo">
      <h1>Title: ${theater.title}</h1>
      <div>
        <img src="${theater.imageUrl}" />
      </div>
    </div>

    <div class="details">
      <h3>Theater Description</h3>
      <p>${theater.description}</p>
      <h4>Date: ${theater.date}</h4>
      <h4>Author: ${theater.author}</h4>

      <div class="buttons">
        ${isOwner
          ? html`<a
                class="btn-delete"
                href="javascript:void(0);"
                @click=${onDelete}
                >Delete</a
              >
              <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`
          : nothing}
        ${theater.currentUser && !isOwner && theater.userLikes == 0
          ? html` <a
              class="btn-like"
              href="javascript:void(0);"
              @click=${onLike}
              >Like</a
            >`
          : nothing}
      </div>
      <p class="likes">Likes: ${theater.likes}</p>
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const theaterId = ctx.params.id;
  const theater = await getById(theaterId);

  const user = ctx.user;
  const isOwner = user && user._id == theater._ownerId;

  theater.currentUser = user;
  theater.likes = await getLikesById(theaterId);
  theater.userLikes = 0;

  if (theater.currentUser) {
    theater.userLikes = await getUserLikes(theaterId, theater.currentUser._id);
  }

  ctx.render(detailsTemplate(theater, isOwner, onDelete, onLike));

  async function onDelete() {
    const choice = confirm(`Are you sure you want to delete ${theater.title}?`);

    if (choice) {
      await deleteTheater(theaterId);
      ctx.page.redirect("/");
    }
  }

  async function onLike(event) {
    event.target.style.display = "none";
    await sendLike({ theaterId });
    theater.likes = Number(theater.likes) + 1;
    ctx.page.redirect("/details/" + theaterId);
  }
}
