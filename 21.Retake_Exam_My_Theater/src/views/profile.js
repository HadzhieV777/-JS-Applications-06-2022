import { getUserTheater } from "../ api/theaters.js";
import { html } from "../lib.js";

const profileTemplate = (user, theaters) => html` <section id="profilePage">
  <div class="userInfo">
    <div class="avatar">
      <img src="./images/profilePic.png" />
    </div>
    <h2>${user.email}</h2>
  </div>
  <div class="board">
    <!--If there are event-->
    ${theaters.length == 0
      ? html` <div class="no-events">
          <p>This user has no events yet!</p>
        </div>`
      : theaters.map(theaterCard)}
  </div>
</section>`;

const theaterCard = (theater) => html`<div class="eventBoard">
  <div class="event-info">
    <img src="${theater.imageUrl}" />
    <h2>${theater.title}</h2>
    <h6>${theater.date}</h6>
    <a class="btn-details" href="/details/${theater._id}">Details</a>
  </div>
</div> `;

export async function profilePage(ctx) {
  const user = ctx.user;
  const theaters = await getUserTheater(user._id);

  ctx.render(profileTemplate(user, theaters));
}
