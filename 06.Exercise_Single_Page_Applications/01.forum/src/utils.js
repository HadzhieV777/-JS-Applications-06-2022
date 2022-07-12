export function createPostPreview(post) {
  const div = createNewElement("div", "topic-name-wrapper");
  const topicName = createNewElement("div", "topic-name");
  //   Title section
  const a = createNewElement("a", "normal", "", "/src/details.js", `${post._id}`);
  a.appendChild(createNewElement("h2", "", `${post.title}`));
  topicName.appendChild(a);

  //   Body section
  const columns = createNewElement("div", "columns");
  const containerDiv = createNewElement("div");

  const p = createNewElement("p");
  p.innerHTML = `Date: <time>${post.dateAdded}</time>`;
  containerDiv.appendChild(p);

  const userDiv = createNewElement("div", "nick-name");
  userDiv.innerHTML = `<p>Username: <span>${post.username}</span></p>`;
  containerDiv.appendChild(userDiv);

  columns.appendChild(containerDiv);
  topicName.appendChild(columns);
  div.appendChild(topicName);

  return div;
}

export function createPostDetails(post) {
    const element = createNewElement
}

function createNewElement(type, className, data, href, id) {
  const element = document.createElement(type);

  if (className) {
    element.className = className;
  }

  if (data) {
    element.textContent = data;
  }

  if (href) {
    element.href = href;
  }

  if (id){
    element.id = id
  }

  return element;
}
