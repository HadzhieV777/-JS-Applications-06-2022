const resultsEl = document.querySelector("table>tbody");
let [bookTitle, bookAuthor] = document.querySelectorAll("form input");
const formTitle = document.querySelector("form h3");
const submitButton = document.querySelector("form button");

const url = "http://localhost:3030/jsonstore/collections/books";

// GET
document.querySelector("#loadBooks").addEventListener("click", () => {
  getBooks();
});

// POST
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  formTitle.textContent = "FORM";
  submitButton.textContent = "Submit";

  const title = bookTitle.value;
  const author = bookAuthor.value;

  try {
    validateFields(title, author);

    const book = {
      author,
      title,
    };

    if (!event.target.dataset.id) {
      addBook(book);
    } else {
      const id = event.target.dataset.id;
      updateBookContent(book, id);
    }

    bookTitle.value = "";
    bookAuthor.value = "";
    // getBooks()
  } catch (err) {
    alert(err);
  }
});

async function addBook(book) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (response.ok == false) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

async function getBooks() {
  const response = await fetch(url);
  const data = await response.json();
  resultsEl.innerHTML = "";

  Object.values(data).forEach((b) => appendElements(b));
}

function appendElements(book) {
  const tr = createNewElement("tr");
  const td = createNewElement("td");

  const editBtn = createNewElement("button", "Edit");
  editBtn.setAttribute("data-id", book._id);
  const deleteBtn = createNewElement("button", "Delete");

  // PUT
  editBtn.addEventListener("click", (event) => editBook(event));

  // DELETE
  deleteBtn.addEventListener("click", () => deleteBook(book.id, tr));

  tr.appendChild(createNewElement("td", book.author));
  tr.appendChild(createNewElement("td", book.title));

  td.appendChild(editBtn);
  td.appendChild(deleteBtn);
  tr.appendChild(td);

  resultsEl.appendChild(tr);
}

function createNewElement(type, data) {
  const element = document.createElement(type, data);

  if (data) {
    element.textContent = data;
  }

  return element;
}

function validateFields(title, author) {
  if (title == "") {
    throw new Error("Book title is required!");
  }
  if (author == "") {
    throw new Error("Book author is required!");
  }
}

async function deleteBook(id, element) {
  const response = await fetch(`${url}/${id}`, {
    method: "delete",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }

  element.remove();
}

function editBook(ev) {
  let [title, author] =
    ev.target.parentElement.parentElement.querySelectorAll("td");

  // Set input values
  bookTitle.value = title.textContent;
  bookAuthor.value = author.textContent;

  formTitle.textContent = "Edit FORM";
  submitButton.textContent = "Save";
  submitButton.dataset.id = ev.target.dataset.id;
}

async function updateBookContent(book, id) {
  const response = await fetch(`${url}/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
}
