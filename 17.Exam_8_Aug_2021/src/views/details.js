import { deleteBook, getBookById } from "../api/books.js";
import { getUserLikes, getLikesCount, sendLike } from "../api/likes.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (
  book,
  isOwner,
  isLoggedIn,
  onDelete,
  totalLikesCount,
  onLike,
  didUserLiked
) => html` <section id="details-page" class="details">
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <div class="actions">
      <!-- Edit/Delete buttons ( Only for creator of this book )  -->
      ${isOwner
        ? html` <a class="button" href="/edit/${book._id}">Edit</a>
           <a class="button" href="javascript:void(0);" @click=${onDelete}">Delete</a>`
        : ""}

      <!-- Bonus -->
      <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
      <!-- ${(() => {
        if (isLoggedIn && !isOwner) {
          if (didUserLiked == 0) {
            return html` <a class="button" style="display: block;" href="javascript:void(0);" @click=${onLike}">Like</a>`;
          }
        } else {
          return html` <a class="button" style="display: none;" href="javascript:void(0);" @click=${onLike}">Like</a>`;;
        }
      })()} -->

      ${isLoggedIn && !isOwner && didUserLiked == 0
        ? html`<a class="button" href="javascript:void(0);" @click=${onLike}
            >Like</a
          >`
        : ""}

      <!-- ( for Guests and Users )  -->
      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${totalLikesCount}</span>
      </div>
      <!-- Bonus -->
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

export async function detailsView(ctx) {
  const bookId = ctx.params.id;
  const book = await getBookById(bookId);
  const userData = getUserData();
  const isLoggedIn = userData != undefined;

  let userId;
  let didUserLiked;
  let totalLikesCount;

  if (isLoggedIn) {
    userId = userData._id;
    didUserLiked = await getUserLikes(bookId);
  }

  const isOwner = userData?.id == book._ownerId;
  totalLikesCount = await getLikesCount(bookId);

  ctx.render(
    detailsTemplate(
      book,
      isOwner,
      isLoggedIn,
      onDelete,
      totalLikesCount,
      onLike,
      didUserLiked
    )
  );

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this book?");
    if (choice) {
      await deleteBook(ctx.params.id);
      ctx.page.redirect(ctx.routes.home);
    }
  }

  async function onLike(event) {
    const like = {
      bookId,
    };

    await sendLike(like);
    book.likes++;
    book.userLikes++;
    totalLikesCount = await getLikesCount(bookId);
    didUserLiked = await getUserLikes(bookId);
    ctx.render(
      detailsTemplate(
        book,
        isOwner,
        isLoggedIn,
        onDelete,
        totalLikesCount,
        onLike,
        didUserLiked
      )
    );
  }
}
