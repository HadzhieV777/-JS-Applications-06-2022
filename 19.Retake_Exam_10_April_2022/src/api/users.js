import { get, post } from "./api.js";
import { clearUserData, setUserData } from "../util.js";

const routes = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const result = await post(routes.login, { email, password });

  const userData = {
    id: result._id,
    email: result.email,
    accessToken: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export async function register(email, password) {
  const result = await post(routes.register, {
    email,
    password,
  });

  const userData = {
    id: result._id,
    email: result.email,
    accessToken: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export function logout() {
  get(routes.logout);
  clearUserData();
}
