import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"

export async function login(credentials = { email, password }) {
  const {token, ...user} = await apiFetch("login", { body: credentials }) // (endpoint = "login", {body: {email, password}})
  sessionStorage.setItem(tokenKey, token)
  return user;
}

export async function logout(){
  const data = await apiFetch("logout", { method: "DELETE" })
  sessionStorage.removeItem(tokenKey)
  return data
}

