import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"
export async function signup(credentials = { email, password }) {
  const {token, ...user} = await apiFetch("signup", { body: credentials })
  sessionStorage.setItem(tokenKey, token)
  return user;
}
