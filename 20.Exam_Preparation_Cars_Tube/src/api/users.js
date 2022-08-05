import { get, post } from "./api.js";
import { clearUserData, setUserData } from "../util.js";

const routes = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(username, password) {
  const result = await post(routes.login, { username, password });

  const userData = {
    _id: result._id,
    username: result.username,
    accessToken: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export async function register(username, password) {
  const result = await post(routes.register, {
    username,
    password,
  });

  const userData = {
    _id: result._id,
    username: result.username,
    accessToken: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export function logout() {
  get(routes.logout);
  clearUserData();
}
