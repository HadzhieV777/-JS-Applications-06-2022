import { deleteLisitng, getById } from "../api/listings.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (listing, isOwner, onDelete) => html` <section
  id="listing-details"
>
  <h1>Details</h1>
  <div class="details-info">
    <img src="${listing.imageUrl}" />
    <hr />
    <ul class="listing-props">
      <li><span>Brand:</span>${listing.brand}</li>
      <li><span>Model:</span>${listing.model}</li>
      <li><span>Year:</span>${listing.year}</li>
      <li><span>Price:</span>${listing.price}$</li>
    </ul>

    <p class="description-para">${listing.description}</p>

    <div class="listings-buttons">
      ${isOwner
        ? html` <a href="/edit/${listing._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" class="button-list" @click=${onDelete}
              >Delete</a
            >`
        : nothing}
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const listingId = ctx.params.id;
  const listing = await getById(listingId);
  const user = ctx.user;
  const isOwner = user && listing._ownerId == user._id;
  ctx.render(detailsTemplate(listing, isOwner, onDelete));

  async function onDelete() {
    const confirmed = confirm(
      `Are you sure you want to delete ${listing.brand} ${listing.model}`
    );

    if (confirmed) {
      await deleteLisitng(listingId);
      ctx.page.redirect("/all-listings");
    }
  }
}
