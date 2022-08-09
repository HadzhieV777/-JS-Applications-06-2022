import { del, get, post, put } from "./api.js";

const routes = {
  all: "/data/theaters?sortBy=_createdOn%20desc&distinct=title",
  userEvents: (userId) =>
    `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  getById: "/data/theaters/",
  create: "/data/theaters",
  update: "/data/theaters/",
  delete: "/data/theaters/",
};

export async function getAll() {
  return get(routes.all);
}

export async function getById(id) {
  return get(routes.getById + id);
}

export async function getUserTheater(userId) {
  return get(routes.userEvents(userId));
}

export async function createTheater(theater) {
  return post(routes.create, theater);
}

export async function updateTheater(id, theater) {
  return put(routes.update + id, theater);
}

export async function deleteTheater(id) {
  return del(routes.delete + id);
}
