function loadRepos() {
  const div = document.getElementById("res");

  let url = "https://api.github.com/users/testnakov/repos";
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", function () {
    if (request.readyState == 4 && request.status == 200) {
      div.textContent = request.responseText;
    }
  });
  request.open("GET", url);
  request.send()
}
