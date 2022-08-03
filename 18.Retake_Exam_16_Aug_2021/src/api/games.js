import * as api from "./api.js";

const endpoints = {
  recent: "/data/games?sortBy=_createdOn%20desc&distinct=category",
  all: "/data/games?sortBy=_createdOn%20desc",
  getById: "/data/games/",
  create: "/data/games",
  update: "/data/games/",
  delete: "/data/games/",
};

export async function getRecent() {
  return api.get(endpoints.recent);
}

export async function getAll() {
  return api.get(endpoints.all);
}

export async function getById(id) {
  return api.get(endpoints.getById + id);
}

export async function create(data) {
  return api.post(endpoints.create, data);
}

export async function update(id, data) {
  return api.put(endpoints.update + id, data);
}

export async function deleteById(id) {
  return api.del(endpoints.delete + id);
}
