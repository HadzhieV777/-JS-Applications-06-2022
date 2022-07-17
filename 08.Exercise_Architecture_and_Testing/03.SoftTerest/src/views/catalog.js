import { getAllIdeas } from "../api/data.js";

const section = document.getElementById("dashboard-holder");

export async function showCatalog(context) {
  context.showSection(section);

  const ideas = await getAllIdeas();
}

function createIdeaPreview(idea) {
  
}
