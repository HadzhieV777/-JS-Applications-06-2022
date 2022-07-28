import {
  deletePetById,
  getPetById,
  didUserDonation,
  getTotalDonationCount,
  donationPet,
} from "../api/data.js";
import { html } from "../lib.js";

const detailsTemplate = (
  pet,
  isOwner,
  onDelete,
  isLoggedIn,
  totalDonationCount,
  onClickDonation,
  didUserDonate
) => html` <section id="detailsPage">
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
        <h4 class="donation">Donation: ${totalDonationCount * 100}$</h4>
      </div>
      <!-- if there is no registered user, do not display div-->
      <div class="actionBtn">
        ${isOwner
          ? html` <a href="/edit/${pet._id}" class="edit">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} class="remove"
                >Delete</a
              >`
          : ""}
        <!--(Bonus Part) Only for no creator and user-->
        ${(() => {
          if (didUserDonate == 0) {
            if (isLoggedIn && !isOwner) {
              return html`<a
                href="javascript:void(0)"
                class="donate"
                @click=${onClickDonation}
                >Donate</a
              >`;
            }
          }
        })()}
      </div>
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  const petId = ctx.params.id;
  const pet = await getPetById(petId);
  const user = ctx.user;

  let userId;
  let didUserDonate;
  let totalDonationCount;

  if (user != null) {
    userId = user._id;
    didUserDonate = await didUserDonation(petId, userId);
  }

  const isOwner = user && pet._ownerId == user._id;
  const isLoggedIn = user !== undefined;
  totalDonationCount = await getTotalDonationCount(petId);

  ctx.render(
    detailsTemplate(
      pet,
      isOwner,
      onDelete,
      isLoggedIn,
      totalDonationCount,
      onClickDonation,
      didUserDonate
    )
  );

  async function onDelete() {
    const userConfirm = confirm("Are you sure?");
    if (userConfirm) {
      await deletePetById(petId);
      ctx.page.redirect("/");
    }
  }

  async function onClickDonation() {
    const donation = {
      petId,
    };
    await donationPet(donation);

    totalDonationCount = await getTotalDonationCount(petId);
    didUserDonate = await didUserDonation(petId, userId);
    ctx.render(
      detailsTemplate(
        pet,
        isOwner,
        onDelete,
        isLoggedIn,
        totalDonationCount,
        onClickDonation,
        didUserDonation
      )
    );
  }
}
