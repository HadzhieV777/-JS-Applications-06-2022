import { get, post } from "./api.js";

const routes = {
  donations: "/data/donations",
  donationsCount: (postId) =>
    `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
  userDonation: (listingId, userId) =>
    `/data/donations?where=postId%3D%22${listingId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function donationPost(listingId) {
  return await post(routes.donations, listingId);
}

export async function getTotalDonationCount(postId) {
  return await get(routes.donationsCount(postId));
}

export async function didUserDonation(listingId, userId) {
  return await get(routes.userDonation(listingId, userId));
}
