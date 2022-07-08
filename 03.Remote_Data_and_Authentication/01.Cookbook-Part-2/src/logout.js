document.getElementById("logoutBtn").addEventListener("click", logout);

// Logout function
async function logout() {
  const response = await fetch("http://localhost:3030/users/logout", {
    method: "get",
    headers: {
      "X-Authorization": sessionStorage.getItem("accessToken"),
    },
  });

  if (response.status == 200) {
    ssessionStorage.removeItem("accessToken");
    window.location.pathname = "index.html";
  } else {
    console.error(await response.json());
  }
}
