import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

export async function login(credentials = { email, password }) {
  const { token, ...user } = await apiFetch("login", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function logout() {
  try {
    const data = await apiFetch("logout", { method: "DELETE" });
    sessionStorage.removeItem(tokenKey);
    return data;
  } catch (error) {
    console.log(error);
  }
}
