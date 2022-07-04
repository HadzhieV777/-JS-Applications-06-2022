window.addEventListener("load", async () => {
  const main = document.querySelector("body > main");

  // take all recipes from the request
  const response = await fetch(
    "http://localhost:3030/jsonstore/cookbook/recipes"
  );
  const recipes = await response.json();

  main.innerHTML = "";

  // render all recipes
  Object.values(recipes).forEach((recipe) => createNewArticle(recipe, main));

});

function createElement(type, classN, content, src, id) {
  let element = document.createElement(type);

  if (classN && classN !== "") {
    element.className = classN;
  }

  if (content && content !== "") {
    element.innerText = content;
  }

  if (src) {
    element.src = src;
  }

  if (id) {
    element.id = id;
  }

  return element;
}

function createNewArticle(recipe, section) {
  let article = createElement("article", "preview", "", "", recipe._id);
  article.addEventListener("click", showDetails)

  const div = {
    title: createElement("div", "title"),
    main: createElement("div", "small"),
  };

  div.title.appendChild(createElement("h2", "", recipe.name));
  div.main.appendChild(createElement("img", "", "", recipe.img));

  article.appendChild(div.title);
  article.appendChild(div.main);

  section.appendChild(article);
}

async function showDetails(event) {
  let currentId;
  let currentArticle;

  if (event.target.id === "") {
    let parentDiv = event.target.parentElement;
    let article = parentDiv.parentElement;
    currentId = article.id;
    currentArticle = article;
  } else {
    currentId = event.target.id;
    currentArticle = event.target;
  }

  const url = await fetch(
    `http://localhost:3030/jsonstore/cookbook/details/${currentId}`
  );
  const response = await url.json();
  createRecipeToggle(response, currentArticle);
}

function createRecipeToggle(recipe, article) {
  article.innerHTML = "";
  article.className = "";
  article.appendChild(createElement("h2", "", recipe.name));

  let band = createElement("div", "band");

  // Img section
  let thumb = createElement("div", "thumb");
  thumb.appendChild(createElement("img", "", "", recipe.img));
  band.appendChild(thumb);

  // Ingredients section
  let ing = createElement("div", "ingredients");
  ing.appendChild(createElement("h3", "", "Ingredients:"));
  let ul = createElement("ul");

  recipe.ingredients.forEach((i) => ul.appendChild(createElement("li", "", i)));
  ing.appendChild(ul);
  band.appendChild(ing);
  article.appendChild(band);

  // Description section
  let description = createElement("div", "description");
  description.appendChild(createElement("h3", "", "Preparation:"));

  recipe.steps.forEach((s) =>
    description.appendChild(createElement("p", "", s))
  );
  article.appendChild(description);
}

