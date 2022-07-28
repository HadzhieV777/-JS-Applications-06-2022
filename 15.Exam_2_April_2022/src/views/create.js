import { html } from "../lib.js";
import { createPet } from "../api/data.js";

const createTemplate = (onSubmit) => html`<section id="createPage">
<form class="createForm" @submit=${onSubmit}>
  <form class="createForm">
    <img src="./images/cat-create.jpg" />
    <div>
      <h2>Create PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" placeholder="Max" />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" placeholder="2 years" />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" placeholder="5kg" />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input
          name="image"
          id="image"
          type="text"
          placeholder="./image/dog.jpeg"
        />
      </div>
      <button class="btn" type="submit">Create Pet</button>
    </div>
  </form>
</section>`;

export function createView(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const pet = {
      name: formData.get("name").trim(),
      breed: formData.get("breed").trim(),
      age: formData.get("age").trim(),
      weight: formData.get("weight").trim(),
      image: formData.get("image").trim(),
    };

    if (Object.values(pet).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await createPet(pet);
    event.target.reset();
    ctx.page.redirect("/dashboard");
  }
}

/* 
The some() method checks if any array elements pass a test (provided as a callback function).
The some() method executes the callback function once for each array element.
The some() method returns true (and stops) if the function returns true for one of the array elements.
The some() method returns false if the function returns false for all of the array elements.
The some() method does not execute the function for empty array elements.
The some() method does not change the original array.
*/
