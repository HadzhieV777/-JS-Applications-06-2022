const section = document.getElementById("detailsView");
section.remove();

export function showDetails(ev) {
  if (ev.target.tagName == "A") {
    showPost();
  }
}

function showPost(postId) {
  document.querySelector("main").replaceChildren(section);
}
