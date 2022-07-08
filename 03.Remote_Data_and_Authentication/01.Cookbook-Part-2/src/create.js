document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const name = formData.get("name").trim();
  const img = formData.get("img").trim();
  const ingredients = formData.get("ingredients").trim().split("\n");
  const steps = formData.get("steps").trim().split("\n");

  const token = sessionStorage.getItem("accessToken");
  if (token == null) {
    throw new Error("You must be logged in!");
  }

  try {
    validateAllFields(name, img, ingredients, steps);

    const recipe = {
      name,
      img,
      ingredients,
      steps,
    };

    const response = await fetch("http://localhost:3030/data/recipes", {
      method: "post",
      headers: { "Content-Type": "application/json", "X-Authorization": token },
      body: JSON.stringify(recipe),
    });

    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    } else {
      document.querySelector(".emsg").innerText = "";
      window.location = "./";
    }
  } catch (error) {
    document.querySelector(".emsg").innerText = error.message;
  }
});

//   Validate fields
function validateAllFields(name, img, ingredients, steps) {
  if (name == "") {
    document.querySelector('[name="name"]').style.border = "3px solid red";
    throw new Error("Name is required!");
  } else {
    document.querySelector('[name="name"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }

  if (img == "") {
    document.querySelector('[name="img"]').style.border = "3px solid red";
    throw new Error("Image is required!");
  } else {
    document.querySelector('[name="img"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }

  if (ingredients == "") {
    document.querySelector('[name="ingredients"]').style.border =
      "3px solid red";
    throw new Error("You must add at least one ingredient!");
  } else {
    document.querySelector('[name="ingredients"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }

  if (steps == "") {
    document.querySelector('[name="steps"]').style.border = "3px solid red";
    throw new Error("You must add at least one preparation step!");
  } else {
    document.querySelector('[name="steps"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }
}
