import * as api from "./api.js";

export async function getAllPets() {
  return await api.get(
    api.host + "/data/pets?sortBy=_createdOn%20desc&distinct=name"
  );
}

export async function createPet(listing) {
  return await api.post(api.host + "/data/pets", listing);
}

export async function getPetById(id) {
  return await api.get(api.host + `/data/pets/${id}`);
}
