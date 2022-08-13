import { API_URL } from "../config/api";

const API = async ({ method, route, token, data }) => {
  try {
    const options = {
      method,
      headers: {
        Accept: "application/json",
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    const url = `${API_URL}${route}`;
    const response = await fetch(url, options);
    if (response.status === 200) {
      const result = await response.json();
      return { success: true, data: result, error: null };
    } else {
      const { error } = await response.json();
      return { success: false, error, data: null };
    }
  } catch (error) {
    error.message = "Something went wrong!";
    return {
      success: false,
      error,
      data: null,
    };
  }
};

export default API;
