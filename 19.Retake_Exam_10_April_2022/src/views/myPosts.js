import { getMyPosts } from "../api/posts.js";
import { html } from "../lib.js";

const myPostsTemplate = (posts) => html`<section id="my-posts-page">
  <h1 class="title">My Posts</h1>

  <!-- Display a div with information about every post (if any)-->
  <div class="my-posts">
    ${posts.length == 0
      ? html` <h1 class="title no-posts-title">You have no posts yet!</h1>`
      : posts.map(postCard)}
  </div>
</section>`;

const postCard = (post) => html` <div class="post">
  <h2 class="post-title">${post.title}</h2>
  <img class="post-image" src="${post.imageUrl}" alt="Material Image" />
  <div class="btn-wrapper">
    <a href="/details/${post._id}" class="details-btn btn">Details</a>
  </div>
</div>`;

export async function myPostsPage(ctx) {
  const userId = ctx.user.id;
  const posts = await getMyPosts(userId);
  ctx.render(myPostsTemplate(posts));
}
