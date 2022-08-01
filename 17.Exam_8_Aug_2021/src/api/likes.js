import { getUserData } from "../utils.js";
import { get, post } from "./api.js";

export async function sendLike(bookId) {
  return post(`/data/likes`, bookId);
}

export async function getLikesCount(bookId) {
  return get(
    `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`
  );
}

export async function getUserLikes(bookId) {
  const userData = getUserData();
  return get(
    `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userData._id}%22&count`
  );
}
