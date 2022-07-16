const host = "http://localhost:3030";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(host + url, options);

    // Handle server responses where status codes are >= 400 and 500
    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }

    // Handle valid but empty server response
    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// With the bind() method, an object can borrow a method from another object.
// The first param in the decorators is the context, set to null, because don't need the 'this' in the request func
const get = request.bind(null, "get");
const post = request.bind(null, "post");
const put = request.bind(null, "put");
const del = request.bind(null, "delete");

export { get, post, put, del as delete };
