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
    console.log(event.target.id)   
    // TODO find a way to hande the return of <empty string>
    // caused by clicking on article's inner elements 
}
