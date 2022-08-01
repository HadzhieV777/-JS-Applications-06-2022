import { del, get, post, put } from "./api.js";

const routes = {
  allBooks: "/data/books?sortBy=_createdOn%20desc",
  createBook: "/data/books",
  getBook: "/data/books/",
  delBook: "/data/books/",
  updateBook: "/data/books/",
};

export async function getAllBooks() {
  return get(routes.allBooks);
}

export async function getUserBooks(userId) {
  return get(
    `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export async function createBook(book) {
  return post(routes.createBook, book);
}

export async function getBookById(id) {
  return get(routes.getBook + id);
}

export async function updateBook(id, book) {
  return put(routes.updateBook + id, book);
}

export async function deleteBook(id) {
  return del(routes.delBook + id);
}
