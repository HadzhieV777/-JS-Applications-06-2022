import {
  getApplicationsById,
  getUserApplications,
  sendApplication,
} from "../api/aply.js";
import { deleteOffer, getById } from "../api/offers.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (
  offer,
  isOwner,
  onDelete,
  onAply
) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${offer.imageUrl}" alt="${offer.title}" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
      Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${offer.description}</span>
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${offer.requirements}</span>
      </div>
    </div>
    <p>Applications: <strong id="applications">${
      offer.applications
    }</strong></p>

    <!--Edit and Delete are only for creator-->
   ${
     isOwner
       ? html` <div id="action-buttons">
           <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
           <a href="javascript:void(0);" @click=${onDelete} id="delete-btn"
             >Delete</a
           >
         </div>`
       : nothing
   }

 <!--Bonus - Only for logged-in users ( not authors )-->
   ${
     offer.currentUser && !isOwner && offer.userApplications == 0
       ? html` <a href="javascript:void(0);" @click=${onAply} id="apply-btn"
           >Apply</a
         >`
       : nothing
   }

    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const offerId = ctx.params.id;
  const offer = await getById(offerId);

  const user = ctx.user;
  const isOwner = user && user._id == offer._ownerId;

  offer.currentUser = user;
  offer.applications = await getApplicationsById(offerId);
  offer.userApplications = 0;

  if (offer.currentUser) {
    offer.userApplications = await getUserApplications(
      offerId,
      offer.currentUser._id
    );
  }

  ctx.render(detailsTemplate(offer, isOwner, onDelete, onAply));

  async function onDelete() {
    const choice = confirm(`Are you sure you want to delete ${offer.title}?`);

    if (choice) {
      await deleteOffer(offerId);
      ctx.page.redirect("/dashboard");
    }
  }

  async function onAply(event) {
    event.target.style.display = "none";
    await sendApplication({ offerId });
    offer.applications = Number(offer.applications) + 1;
    ctx.page.redirect("/details/" + offerId);
  }
}
