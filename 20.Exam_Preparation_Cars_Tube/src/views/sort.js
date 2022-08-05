import { sortByYear } from "../api/listings.js";
import { html } from "../lib.js";

const sortTemplate = (onClick, listings) => html` <section id="search-cars">
  <h1>Filter by year</h1>

  <div class="container">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired production year"
    />
    <button @click=${onClick} class="button-list">Search</button>
  </div>

  <h2>Results:</h2>
  <div class="listings">
    <!-- Display all records -->
    ${listings.length == 0
      ? html` <p class="no-cars">No results.</p>`
      : listings.map(listingCard)}
  </div>
</section>`;

const listingCard = (listing) => html` <div class="listing">
  <div class="preview">
    <img src="${listing.imageUrl}" />
  </div>
  <h2>${listing.brand} ${listing.model}</h2>
  <div class="info">
    <div class="data-info">
      <h3>Year: ${listing.year}</h3>
      <h3>Price: ${listing.price} $</h3>
    </div>
    <div class="data-buttons">
      <a href="/details/${listing._id}" class="button-carDetails">Details</a>
    </div>
  </div>
</div>`;

export async function sortPage(ctx) {
  ctx.render(sortTemplate(onClick, []));

  async function onClick() {
    const field = document.getElementById("search-input");

    if (field.value == "") {
      return alert("You can't submit an empty field!");
    }

    const listings = await sortByYear(field.value);
    field.value = "";
    ctx.render(sortTemplate(onClick, listings))
  }
}
