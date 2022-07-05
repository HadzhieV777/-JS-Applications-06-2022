function lockedProfile() {
  const main = document.getElementById("main");
  const url = "http://localhost:3030/jsonstore/advanced/profiles";

  main.innerHTML = "";
  generateSections(url, main);
}

async function generateSections(link, main) {
  const data = await fetch(link);
  const response = await data.json();
  Object.entries(response).forEach((e) => createNewSection(e, main));
}

function createNewSection(profile, section) {
  const div = document.createElement("div");
  div.className = "profile";
  div.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user1Locked" value="lock" checked>
    <label>Unlock</label>
    <input type="radio" name="user1Locked" value="unlock"><br>
    <hr>
    <label>Username</label>
    <input type="text" name="user1Username" value="${profile[1].username}" disabled readonly />
    <div class="user1Username">
        <hr>
        <label>Email:</label>
        <input type="email" name="user1Email" value="${profile[1].email} disabled readonly />
        <label>Age:</label>
        <input type="text" name="user1Age" value="${profile[1].age} disabled readonly />
    </div>`;

  const moreInfoBtn = document.createElement("button");
  moreInfoBtn.textContent = "Show more";
  div.appendChild(moreInfoBtn);
  section.appendChild(div);

  showMoreInfo();
}

function showMoreInfo() {
  let buttons = document.querySelectorAll("button");

  Array.from(buttons).forEach((btn) => btn.addEventListener("click", showInfo));

  function showInfo(event) {
    let profile = event.target.parentElement;
    let lockedProfile = profile.querySelector('input[value="lock"]');

    if (!lockedProfile.checked) {
      let hiddenData = profile.querySelector("div");

      if (event.target.textContent === "Hide it") {
        hiddenData.style.display = "none";
        event.target.textContent = "Show more";
      } else {
        hiddenData.style.display = "block";
        event.target.textContent = "Hide it";
      }
    }
  }
}
