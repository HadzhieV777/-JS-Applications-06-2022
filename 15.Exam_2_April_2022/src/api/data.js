import * as api from "./api.js";

export async function getAllPets() {
  return await api.get(
    api.host + "/data/pets?sortBy=_createdOn%20desc&distinct=name"
  );
}

// CRUD related
export async function createPet(listing) {
  return await api.post(api.host + "/data/pets", listing);
}

export async function getPetById(id) {
  return await api.get(api.host + `/data/pets/${id}`);
}

export async function editPetById(id, listing) {
  return await api.put(api.host + `/data/pets/${id}`, listing);
}

export async function deletePetById(id) {
  return await api.del(api.host + `/data/pets/${id}`);
}

// Donation Related

export async function donationPet(petId) {
  return await api.post(api.host + `/data/donation`, petId);
}

export async function getTotalDonationCount(petId) {
  return await api.get(
    api.host +
      `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`
  );
}

export async function didUserDonation(petId, userId) {
  return await api.get(
    api.host +
      `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
