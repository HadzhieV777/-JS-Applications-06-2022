import { getUserData, setUserData, clearUserData } from "../utils.js";

const host = "http://localhost:3030";

async function request(url, options) {
  try {
    const response = await fetch(host + url, options);

    if (response.ok != true) {
      if (response.status == 403) {
        clearUserData();
      }
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

function getOptions(method = "get", body) {
  const options = {
    method,
    headers: {},
  };

  const token = sessionStorage.getItem("authToken");
  if (token != null) {
    options.headers["X-Authorization"] = token;
  }

  if (body) {
    options.headers["Content-type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  return options;
}

export async function get(url) {
  return await request(url, getOptions())
}

export async function post(url, data) {
  return await request(url, getOptions('post', data))
}

export async function put(url) {
  return await request(url, getOptions('put', data))
}

export async function del(url) {
  return await request(url, getOptions('delete'))
}

export async function login(email, password) {
  const result = await post(host + "/users/login", { email, password });

  sessionStorage.setItem("email", result.email);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);

  return result;
}

export async function register(email, password) {
  const result = await post(host + "/users/register", { email, password });

  sessionStorage.setItem("email", result.email);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);

  return result;
}

export async function logout() {
  const result = await get(host + "/users/logout");

  sessionStorage.remove("email");
  sessionStorage.remove("authToken");
  sessionStorage.remove("userId");

  return result;
}
