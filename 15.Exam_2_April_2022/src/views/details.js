import { getPetById } from "../api/data.js";
import { html } from "../lib.js";

const detailsTemplate = (pet, isLoggedIn, isOwner) => html` <section
  id="detailsPage"
>
  <div class="details">
    <div class="animalPic">
      <img src="${pet.image}" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${pet.name}</h1>
        <h3>Breed: ${pet.breed}</h3>
        <h4>Age: ${pet.age}</h4>
        <h4>Weight: ${pet.weight}</h4>
        <h4 class="donation">Donation: 0$</h4>
      </div>
      <!-- if there is no registered user, do not display div-->
      <div class="actionBtn">
        ${isOwner
          ? html` <a href="/edit/${pet._id}" class="edit">Edit</a>
              <a href="javascript:void(0)" class="remove">Delete</a>`
          : ""}
        <!--(Bonus Part) Only for no creator and user-->
        <!-- ${() => {
          if (isLoggedIn && !isOwner) {
            return html`<a href="javascript:void(0)" class="donate">Donate</a>`;
          }
        }} -->
      </div>
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  const petId = ctx.params.id;
  const pet = await getPetById(petId);
  const user = ctx.user;
  // TODO SHOW EDIT AND DEL BUTTONS

  let userId;
  if (user != null) {
    userId = user._id;
  }

  const isOwner = user && pet._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  ctx.render(detailsTemplate(pet, isLoggedIn, isOwner));
}
