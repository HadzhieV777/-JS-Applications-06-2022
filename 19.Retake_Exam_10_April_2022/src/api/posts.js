import { del, get, post, put } from "./api.js";

const routes = {
  allPosts: "/data/posts?sortBy=_createdOn%20desc",
  //   createMeme: "/data/memes",
  //   getMeme: "/data/memes/",
  //   delMeme: "/data/memes/",
  //   updateMeme: "/data/memes/",
};

export async function getAllPosts() {
  return get(routes.allPosts);
}
