import { getContacts } from "./services/contacts-services.js";

async function fetchContacts() {
  const all_contacts = await getContacts();
  this.contacts = [...all_contacts];
  this.favorites = all_contacts
    .filter((contact) => contact.favorite === true)
    .reverse();
}

function deleteContact(id) {
  this.contacts = this.contacts.filter((contact) => contact.id != id);
  this.favorites = this.favorites.filter((contact) => contact.id != id);
}

function favoriteContact(id) {
  this.favorites.push(this.contacts.find((c) => c.id == id));
}
function unFavoriteContact(id) {
  this.favorites.splice(
    this.favorites.findIndex((e) => e.id == id),
    1
  );
}

let STORE = {
  user: null,
  contacts: [],
  favorites: [],
  currentContact: null,
  fetchContacts,
  deleteContact,
  favoriteContact,
  unFavoriteContact,
};

export default STORE;
