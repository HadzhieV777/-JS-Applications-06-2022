import { render } from "../lib.js";

const root = document.getElementById("main-content");

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  ctx.render = ctxRender;

  next();
}
