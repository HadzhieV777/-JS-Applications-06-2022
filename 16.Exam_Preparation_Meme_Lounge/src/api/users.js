import { get, post } from "./api.js";
import { clearUserData, setUserData } from "../utils.js";

const routes = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const result = await post(routes.login, { email, password });

  const userData = {
    id: result._id,
    username: result.username,
    email: result.email,
    gender: result.gender,
    accessToken: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export async function register(username, email, password, gender) {
  const result = await post(routes.register, {
    username,
    email,
    password,
    gender,
  });

  const userData = {
    id: result._id,
    username: result.username,
    email: result.email,
    gender: result.gender,
    accessToken: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export function logout() {
  get(routes.logout);
  clearUserData();
}
