document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const email = formData.get("email");
  const password = formData.get("password");
  const repass = formData.get("rePass");

  try {
    validateAllFields(email, password, repass);

    const response = await fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // Validate server response
    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    } else {
      document.querySelector(".emsg").innerText = "";
      const data = await response.json();
      sessionStorage.setItem("accessToken", data.accessToken);
      window.location = "./";
    }
  } catch (error) {
    document.querySelector(".emsg").innerText = error.message;
  }
});

//   Validate fields
function validateAllFields(email, password, repass) {
  if (email == "") {
    document.querySelector('[name="email"]').style.border = "3px solid red";
    throw new Error("Email field is required!");
  } else {
    document.querySelector('[name="email"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
    document.querySelector('[name="email"]').style.border = "3px solid red";
    throw new Error("This email is invalid!");
  } else {
    document.querySelector('[name="email"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }

  if (password == "") {
    document.querySelector('[name="password"]').style.border = "3px solid red";
    throw new Error("Password is required!");
  } else {
    document.querySelector('[name="password"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }

  if (password != repass) {
    document.querySelector('[name="password"]').style.border = "3px solid red";
    document.querySelector('[name="rePass"]').style.border = "3px solid red";
    throw new Error("Passwords didn't match!");
  } else {
    document.querySelector('[name="password"]').style.border = "";
    document.querySelector('[name="rePass"]').style.border = "";
    document.querySelector(".emsg").innerText = "";
  }
}
