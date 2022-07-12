const section = document.getElementById("detailsView");
section.remove();

export function showDetails(ev) {
  let target = ev.target;

  // necessary to check if ev.target is h2 because inside
  // the a there is a h2
  if (target.tagName == "H2") {
    target = target.parentElement;
  }

  if (target.tagName == "A") {
    ev.preventDefault();

    const postId = target.id
    showPost(postId);
  }
}

function showPost(postId) {
  document.querySelector("main").replaceChildren('Loading...');

  const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + postId)
  const post = await response.json();


  document.querySelector("main").replaceChildren(section);
  console.log(postId)
}
