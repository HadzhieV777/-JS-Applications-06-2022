async function loadRepos() {
	// read input
  const usernameInput = document.getElementById("username");
  const reposUl = document.getElementById("repos");

  let url = `https://api.github.com/users/${usernameInput.value}/repos`;

  try {
    // send request
    const response = await fetch(url);

    if (response.ok == false) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    reposUl.innerHTML = "";

    for (let repo of data) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = `${repo.html_url}`;
      a.target = "_blank";
      a.innerText = repo.full_name;

      li.appendChild(a);
      reposUl.appendChild(li);
    }
  } catch (error) {
    reposUl.innerHTML = `${error.message}`;
  }
}
