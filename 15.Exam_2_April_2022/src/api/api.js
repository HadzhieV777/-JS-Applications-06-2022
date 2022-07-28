import { getUserData, setUserData, clearUserData } from "../utils.js";

export const host = "http://localhost:3030";

async function request(url, options) {
  try {
    const response = await fetch(url, options);

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

function getOptions(method = 'get', body) {
  const options = {
      method,
      headers: {}
  }

  const user = getUserData();
  if (user) {
      options.headers['x-authorization'] = user.accessToken;
  }

  if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
  }

  return options;
}


export async function get(url) {
  return request(url, getOptions());
}

export async function post(url, data) {
  return request(url, getOptions("post", data));
}

export async function put(url, data) {
  return request(url, getOptions("put", data));
}

export async function del(url) {
  return request(url, getOptions("delete"));
}

export async function login(email, password) {
  const result = await post(host + "/users/login", {
    email,
    password,
  });
  setUserData(result);

  return result;
}

export async function register(email, password) {
  const result = await post(host + "/users/register", {
    email,
    password,
  });
  setUserData(result);

  return result;
}

export function logout() {
  const result = get(host + "/users/logout");
  clearUserData();

  return result;
}
