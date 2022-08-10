import { del, get, post, put } from "./api.js";

const routes = {
  sendApplication: "/data/applications",
  getApplicationsById: (offerId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
  getUserApplications: (offerId, userId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function sendApplication(application) {
  return post(routes.sendApplication, application);
}

export async function getApplicationsById(offerId) {
  return get(routes.getApplicationsById(offerId));
}

export async function getUserApplications(offerId, userId) {
  return get(routes.getUserApplications(offerId, userId));
}
