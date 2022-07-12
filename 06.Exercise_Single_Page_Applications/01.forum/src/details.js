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
    showPost();
  }
}

function showPost(postId) {
  document.querySelector("main").replaceChildren(section);
}
