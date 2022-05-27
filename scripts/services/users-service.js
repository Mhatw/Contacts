import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"
export async function signup(credentials = { email, password }) {
  const {token, ...user} = await apiFetch("signup", { body: credentials }) // (endpoint = "login", {body: {email, password}})
  sessionStorage.setItem(tokenKey, token)
  return user;
}
