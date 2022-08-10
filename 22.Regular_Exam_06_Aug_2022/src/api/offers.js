import { del, get, post, put } from "./api.js";

const routes = {
  all: "/data/offers?sortBy=_createdOn%20desc",
  getById: "/data/offers/",
  create: "/data/offers",
  update: "/data/offers/",
  delete: "/data/offers/",
};

export async function getAll() {
  return get(routes.all);
}

export async function getById(offerId) {
  return get(routes.getById + offerId);
}

export async function createOffer(offer) {
  return post(routes.create, offer);
}

export async function updateOffer(offerId, offer) {
  return put(routes.update + offerId, offer);
}

export async function deleteOffer(offerId) {
  return del(routes.delete + offerId);
}
