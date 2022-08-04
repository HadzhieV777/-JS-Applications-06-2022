import { createPost } from "../api/posts.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html` <section
  id="create-page"
  class="auth"
>
  <form id="create" @submit=${onSubmit}>
    <h1 class="title">Create Post</h1>

    <article class="input-group">
      <label for="title">Post Title</label>
      <input type="title" name="title" id="title" />
    </article>

    <article class="input-group">
      <label for="description">Description of the needs </label>
      <input type="text" name="description" id="description" />
    </article>

    <article class="input-group">
      <label for="imageUrl"> Needed materials image </label>
      <input type="text" name="imageUrl" id="imageUrl" />
    </article>

    <article class="input-group">
      <label for="address">Address of the orphanage</label>
      <input type="text" name="address" id="address" />
    </article>

    <article class="input-group">
      <label for="phone">Phone number of orphanage employee</label>
      <input type="text" name="phone" id="phone" />
    </article>

    <input type="submit" class="btn submit" value="Create Post" />
  </form>
</section>`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const singlePost = {
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      address: formData.get("address").trim(),
      phone: formData.get("phone").trim(),
    };

    if (Object.values(singlePost).some((f) => f == "")) {
      return alert("All fields are required!");
    }

    await createPost(singlePost);
    event.target.reset();
    ctx.page.redirect("/");
  }
}
