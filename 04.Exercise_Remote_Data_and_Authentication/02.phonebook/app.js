function attachEvents() {
  const phonebook = document.querySelector("#phonebook");
  const url = "http://localhost:3030/jsonstore/phonebook";

  const field = {
    person: document.querySelector("#person"),
    phone: document.querySelector("#phone"),
  };

  const button = {
    load: document.querySelector("#btnLoad"),
    create: document.querySelector("#btnCreate"),
  };

  button.load.addEventListener("click", async () => {
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach((c) => showContacts(c, phonebook, url));
  });

  button.create.addEventListener("click", async () => {
    const person = field.person.value.trim();
    const phone = field.phone.value.trim();

    try {
      validateFields(person, phone);
      const contact = {
        person,
        phone,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      field.person.value = "";
      field.phone.value = "";
    } catch (e) {
      alert(e.message);
    }
  });
}

attachEvents();

function createNewElement(type, content) {
  const element = document.createElement(type);

  if (content) {
    element.textContent = content;
  }

  return element;
}

function showContacts(contact, section, url) {
  const li = createNewElement("li", `${contact.person}: ${contact.phone}`);
  const button = createNewElement("button", "Delete");

  button.addEventListener("click", () => deleteContact(contact.id, url, li));
  li.appendChild(button);
  section.appendChild(li);
}

async function deleteContact(id, url, element) {
  const response = await fetch(`${url}/${id}`, {
    method: "delete",
  });

  element.remove();
}

function validateFields(person, phone) {
  if (person == "") {
    throw new Error("This field is required!");
  }

  if (phone == "" || Number(phone) == NaN) {
    throw new Error("Invalid data format!");
  }
}
