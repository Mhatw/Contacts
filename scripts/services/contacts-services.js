import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"

export async function getContacts() {
  return apiFetch("contacts")
}

