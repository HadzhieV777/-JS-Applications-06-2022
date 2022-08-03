import { html, nothing } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import * as commentsService from "../api/comments.js";

const formTemplate = (onSubmit) => html` <article class="create-comment">
  <label>Add new comment:</label>
  <form class="form" @submit=${onSubmit}>
    <textarea name="comment" placeholder="Comment......"></textarea>
    <input class="btn submit" type="submit" value="Add Comment" />
  </form>
</article>`;

export function commentFormView(ctx, isOwner) {
  if (ctx.user && !isOwner) {
    return formTemplate(createSubmitHandler(ctx, onSubmit));
  } else {
    return nothing;
  }
}

async function onSubmit(ctx, data, event) {
  const gameId = ctx.params.id;

  if (data.comment == "") {
    return alert("You can't add empty comment!");
  }
  await commentsService.postComment({
    gameId,
    comment: data.comment,
  });

  event.target.reset();
  ctx.page.redirect(`/details/${gameId}`);
}
