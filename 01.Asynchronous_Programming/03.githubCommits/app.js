async function loadCommits() {
  const fields = {
    username: document.getElementById("username"),
    repo: document.getElementById("repo"),
  };

  const list = {
    commits: document.getElementById("commits"),
  };

  const url = `https://api.github.com/repos/${fields.username.value}/${fields.repo.value}/commits`;
  list.commits.innerHTML = "";

  try {
    const response = await fetch(url);

    if (response.ok == false) {
      throw new Error(`(${response.status}) ${response.statusText}`);
    }

    const data = await response.json();

    for (let repo of data) {
      let li = document.createElement("li");
      li.innerText = `${repo.commit.author.name}: ${repo.commit.message}`;

      list.commits.appendChild(li);
    }
  } catch (error) {
    list.commits.innerHTML = error;
  }
}
