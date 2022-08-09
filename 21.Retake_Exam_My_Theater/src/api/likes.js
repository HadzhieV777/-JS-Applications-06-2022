import { del, get, post, put } from "./api.js";

const routes = {
  sendLike: "/data/likes",
  getLikesById: (theaterId) =>
    `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
  getUserLikes: (theaterId, userId) =>
    `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function sendLike(like) {
  return post(routes.sendLike, like);
}

export async function getLikesById(theaterId) {
  return get(routes.getLikesById(theaterId));
}

export async function getUserLikes(theaterId, userId) {
  return get(routes.getUserLikes(theaterId, userId));
}
