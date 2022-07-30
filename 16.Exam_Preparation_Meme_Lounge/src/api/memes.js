import { del, get, post, put } from "./api.js";

const routes = {
  allMemes: "/data/memes?sortBy=_createdOn%20desc",
  createMeme: "/data/memes",
  getMeme: "/data/memes/",
  delMeme: "/data/memes/",
  updateMeme: "/data/memes/",
};

export async function getAllMemes() {
  return get(routes.allMemes);
}

export async function getUserMemes(userId) {
  return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function createMeme(meme) {
  return post(routes.createMeme, meme);
}

export async function getMemeById(id) {
  return get(routes.getMeme + id);
}

export async function updateMeme(id, meme) {
  return put(routes.updateMeme + id, meme);
}

export async function deleteMeme(id) {
  return del(routes.delMeme + id);
}
