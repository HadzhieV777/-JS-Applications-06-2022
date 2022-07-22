import * as api from "./api.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;



const endpoints = {
  all: "/data/catalog",
  byId: "/data/catalog/",
  myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
  create: "/data/catalog",
  edit: "/data/catalog/",
  delete: "/data/catalog/",
};

// GET
export async function getAll() {
  return api.get(api.host + endpoints.all);
}

export async function getById(id) {
  return api.get(api.host + endpoints.byId + id);
}

export async function getMyItems(userId) {
  return api.get(api.host + endpoints.myItems(userId));
}

// CREATE
export async function createItem(data) {
  return api.post(api.host + endpoints.create, data);
}

export async function editItem(id, data) {
  return api.put(api.host + endpoints.edit + id, data);
}

export async function deleteItem(id) {
  return api.del(api.host + endpoints.delete + id)
}


// 45: 45