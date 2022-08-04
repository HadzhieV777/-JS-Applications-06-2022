import { del, get, post, put } from "./api.js";

const routes = {
  all: "/data/posts?sortBy=_createdOn%20desc",
  myPosts: (userId) =>
    `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  create: "/data/posts",
  getPost: "/data/posts/",
  update: "/data/posts/",
  delete: "/data/posts/",
};

export async function getAllPosts() {
  return get(routes.all);
}

export async function getMyPosts(userId) {
  return await get(routes.myPosts(userId));
}

export async function getById(postId) {
  return get(routes.getPost + postId);
}

export async function createPost(singlePost) {
  return post(routes.create, singlePost);
}

export async function updatePost(postId, singlePost) {
  return put(routes.update + postId, singlePost);
}

export async function deletePost(postId) {
  return del(routes.delete + postId);
}
