export function checkUserNav() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null) {
    document.querySelector(
      ".email"
    ).innerHTML = `Welcome, <span>${userData.email}</span>`;
    document.getElementById("logout").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("logout").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}

export function onLogout() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': userData.accessToken
        }
    });
    sessionStorage.removeItem('userData');
    checkUserNav();
    window.location = './'
}