import {getAll} from '../api/data.js'
import { html, until } from "../lib.js";

const catalogTemplate = (dataPromise) => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
  </div>`;

const itemTemplate = (item) => html`<div class="card text-white bg-primary">
  <div class="card-body">
    <img src=${item.img} />
    <p>${item.description}</p>
    <footer>
      <p>Price: <span>${item.price} $</span></p>
    </footer>
    <div>
      <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
    </div>
  </div>
</div>`;

export function catalogPage(ctx) {
  ctx.render(catalogTemplate(loadItems()));
}


async function loadItems() {
   const items = await getAll()
   return items.map(itemTemplate)
}