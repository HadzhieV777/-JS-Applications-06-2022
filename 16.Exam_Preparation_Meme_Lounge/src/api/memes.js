import { get } from "./api.js";

const routes = {
  allMemes: "/data/memes?sortBy=_createdOn%20desc",
};

export async function getAllMemes() {
  return get(routes.allMemes);
}
