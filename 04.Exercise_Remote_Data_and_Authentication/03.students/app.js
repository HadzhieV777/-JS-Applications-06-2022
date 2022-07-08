const resultsEl = document.querySelector("#results tbody");

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const url = "http://localhost:3030/jsonstore/collections/students";

  const firstName = formData.get("firstName").trim();
  const lastName = formData.get("lastName").trim();
  const facultyNumber = Number(formData.get("facultyNumber"));
  const grade = Number(formData.get("grade"));

  try {
    validateFields(firstName, lastName, facultyNumber, grade);

    const student = {
      firstName,
      lastName,
      facultyNumber,
      grade,
    };

    addStudents(student, url);
    getStudents(url);
  } catch (err) {
    alert(err);
  }
});

function validateFields(fName, lName, fNum, grade) {
  if (fName == "") {
    throw new Error("First Name is required!");
  }
  if (lName == "") {
    throw new Error("Last Name is required!");
  }

  if (fNum == "") {
    throw new Error("Faculty Number is required!");
  }

  if (grade == "") {
    throw new Error("Grade is required!");
  }
}

async function addStudents(student, url) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  if (response.ok == false) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

async function getStudents(url) {
  const response = await fetch(url);
  const data = await response.json();
  resultsEl.innerHTML = "";

  Object.values(data).forEach((s) => appendElements(s));
}

function appendElements(student) {
  const tr = createNewElement("tr");

  tr.appendChild(createNewElement("td", student.firstName));
  tr.appendChild(createNewElement("td", student.lastName));
  tr.appendChild(createNewElement("td", student.facultyNumber));
  tr.appendChild(createNewElement("td", student.grade));

  resultsEl.appendChild(tr);
}

function createNewElement(type, data) {
  const element = document.createElement(type, data);

  if (data) {
    element.textContent = data;
  }

  return element;
}
