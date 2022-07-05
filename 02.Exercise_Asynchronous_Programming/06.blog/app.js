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
    posts: "http://localhost:3030/jsonstore/blog/posts/",
    comments: "http://localhost:3030/jsonstore/blog/comments",
  };

  //   Add functionality to the main buttons
  button.load.addEventListener("click", async () => {
    const response = await fetch(url.posts);
    const data = await response.json();

    Object.entries(data).forEach((e) => showAllBlogs(e, button.select));
  });

  button.view.addEventListener("click", () => {
    showSingleBlog(button, url, post);
    getPostComments(button, url, post);
  });
}

attachEvents();

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

function showAllBlogs(blog, select) {
  select.appendChild(createNewElement("option", "", blog[1].title, blog[1].id));
}

async function showSingleBlog(button, url, post) {
  const currentPostId = button.select.value;
  const response = await fetch(url.posts + currentPostId);
  const data = await response.json();

  post.title.textContent = data.title;
  post.body.textContent = data.body;
}

async function getPostComments(button, url, post) {
  const currentPostId = button.select.value;
  const commentsRes = await fetch(url.comments);
  const commentData = await commentsRes.json();

  const postComments = Object.values(commentData).filter(
    (c) => c.postId === currentPostId
  );
  addPostComments(postComments, post);
}

function addPostComments(comments, post) {
  post.comment.innerHTML = "";

  comments.forEach((c) => {
    const li = createNewElement("li");
    li.textContent = c.text;
    post.comment.appendChild(li);
  });
}
