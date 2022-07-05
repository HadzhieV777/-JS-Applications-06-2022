function solution() {
  const mainSection = document.querySelector("#main");
  getData(mainSection);
}
solution();

function createNewElement(type, className, content, id) {
  const element = document.createElement(type);

  if (className) {
    element.className = className;
  }

  if (content) {
    element.textContent = content;
  }

  if (id) {
    element.id = id;
  }

  return element;
}

async function getData(section) {
  const url = "http://localhost:3030/jsonstore/advanced/articles/list";
  const data = await fetch(url);
  const response = await data.json();

  response.forEach((e) => createSection(e, section));
}

function createSection(entry, sec) {
  const searchId = entry._id;
  const div = createNewElement("div", "accordion");

  const head = createNewElement("div", "head");
  head.appendChild(createNewElement("span", "", entry.title));

  const moreBtn = createNewElement("button", "button", "More", searchId);
  moreBtn.addEventListener("click", toggle);
  head.appendChild(moreBtn);

  div.appendChild(head);

  // Add hidden section
  const extra = createNewElement("div", "extra");
  extra.style.display = "none";

  const content = createNewElement("p");
  extra.appendChild(content);
  div.appendChild(extra);
  sec.appendChild(div);

  function toggle() {
    if (moreBtn.textContent === "More") {
      fetch(
        `http://localhost:3030/jsonstore/advanced/articles/details/${searchId}`
      )
        .then((res) => res.json())
        .then((extraContent) => {
          content.textContent = extraContent.content;
          moreBtn.textContent = "Less";
          extra.style.display = "block";
        });
    } else {
      content.textContent = "";
      extra.style.display = "none";
      moreBtn.textContent = "More";
    }
  }
}
