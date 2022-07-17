export function initialize(urls) {
  const main = document.querySelector("main");
  document.querySelector("nav").addEventListener("click", onNavigate);

  const context = {
    showSection,
    goToPage,
  };

  return context;

  function showSection(section) {
    main.replaceChildren(section);
  }

  function onNavigate(event) {
    let target = event.target;
    if (target.tagName == "IMG") {
      target = target.parentElement;
    }

    if (target.tagName == "A") {
      event.preventDefault();
      const url = new URL(target.href);
      goToPage(url.pathname);
    }
  }

  // Func for navigating between pages without onNavigate function
  function goToPage(name) {
    const handler = urls[name];

    if (typeof handler == "function") {
      handler(context);
    }
  }
}
