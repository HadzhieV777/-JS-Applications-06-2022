import { del, get, post, put } from "./api.js";

const routes = {
  all: "/data/cars?sortBy=_createdOn%20desc",
  myListings: (userId) =>
    `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  getById: "/data/cars/",
  create: "/data/cars",
  update: "/data/cars/",
  delete: "/data/cars/",
};

export async function getAllListings() {
  return get(routes.all);
}

export async function getMyListings(userId) {
  return get(routes.myListings(userId));
}

export async function getById(id) {
  return get(routes.getById + id);
}

export async function createLisitng(listing) {
  return post(routes.create, listing);
}

export async function updateLisitng(id, listing) {
  return put(routes.update + id, listing);
}

export async function deleteLisitng(id) {
  return del(routes.delete + id);
}
