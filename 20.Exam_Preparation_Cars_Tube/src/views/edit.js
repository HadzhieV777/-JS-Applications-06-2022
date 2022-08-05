import { getById, updateLisitng } from "../api/listings.js";
import { html } from "../lib.js";

const editTemplate = (listing, onSubmit) => html` <section id="edit-listing">
  <div class="container">
    <form id="edit-form" @submit=${onSubmit}>
      <h1>Edit Car Listing</h1>
      <p>Please fill in this form to edit an listing.</p>
      <hr />

      <p>Car Brand</p>
      <input
        type="text"
        placeholder="Enter Car Brand"
        name="brand"
        value="${listing.brand}"
      />

      <p>Car Model</p>
      <input
        type="text"
        placeholder="Enter Car Model"
        name="model"
        value="${listing.model}"
      />

      <p>Description</p>
      <input
        type="text"
        placeholder="Enter Description"
        name="description"
        value="${listing.description}"
      />

      <p>Car Year</p>
      <input
        type="number"
        placeholder="Enter Car Year"
        name="year"
        value="${listing.year}"
      />

      <p>Car Image</p>
      <input
        type="text"
        placeholder="Enter Car Image"
        name="imageUrl"
        value="${listing.imageUrl}"
      />

      <p>Car Price</p>
      <input
        type="number"
        placeholder="Enter Car Price"
        name="price"
        value="${listing.price}"
      />

      <hr />
      <input type="submit" class="registerbtn" value="Edit Listing" />
    </form>
  </div>
</section>`;

export async function editPage(ctx) {
  const listingId = ctx.params.id;
  const listing = await getById(listingId);

  ctx.render(editTemplate(listing, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const listing = {
      brand: formData.get("brand").trim(),
      model: formData.get("model").trim(),
      description: formData.get("description").trim(),
      year: Number(formData.get("year").trim()),
      imageUrl: formData.get("imageUrl").trim(),
      price: Number(formData.get("price").trim()),
    };

    if (Object.values(listing).some((f) => f == "")) {
      return alert("All fields are required!");
    }

    await updateLisitng(listingId, listing);
    event.target.reset();
    ctx.page.redirect("/details/" + listingId);
  }
}
