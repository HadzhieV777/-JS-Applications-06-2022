function attachEvents() {
  //   Take all needed elements
  const button = {
    load: document.querySelector("#btnLoadPosts"),
    view: document.querySelector("#btnViewPost"),
    select: document.querySelector("#posts"),
  };

  const post = {
    title: document.querySelector("#post-title"),
    body: document.querySelector("#post-body"),
    comment: document.querySelector("#post-comments"),
  };

  const url = {
    posts: "http://localhost:3030/jsonstore/blog/posts",
    comments: "http://localhost:3030/jsonstore/blog/comments",
  };

  //   Add functionality to the main buttons
  button.load.addEventListener("click", async () => {
    const data = await fetch(url.posts);
    const response = await data.json();

    Object.entries(response).forEach((e) => showAllBlogs(e, button.select));
  });
}

attachEvents();

function showAllBlogs(blog, select) {
  select.appendChild(createNewElement("option", "", blog[1].title, blog[1].id));

}

// Factory func for creating a new elements
function createNewElement(type, className, data, value) {
  let element = document.createElement(type);

  if (className) {
    element.className = className;
  }

  if (data) {
    element.innerText = data;
  }

  if (value) {
    element.value = value;
  }

  return element;
}
