import apiFetch from "./api-fetch.js";

export async function getContacts() {
  return apiFetch("contacts");
}

export async function createContacts(
  newContacts = { name, email, number, relations }
) {
  return apiFetch("contacts", { body: newContacts });
}

export async function deleteContacts(id) {
  return apiFetch("contacts/" + id, { method: "DELETE" });
}

export async function editContacts(
  id,
  payload = { name, email, number, relations }
) {
  const { token, ...contact } = await apiFetch("contacts/" + id, {
    method: "PATCH",
    body: payload,
  });
  return contact;
}

export async function showContact(id) {
  return apiFetch("contacts/" + id);
}