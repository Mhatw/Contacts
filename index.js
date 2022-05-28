import {  createContacts, getContacts, deleteContacts, editContacts, showContact } from "./scripts/services/contacts-services.js";
import DOMHandler from "./scripts/dom-handler.js";
import { HomePage } from "./scripts/renders/home.js";
import { login, logout } from "./scripts/services/sessions-service.js";
import STORE from "./scripts/store.js";


async function init() {
  try {
    
    const user = await login({email: "fabio@mail.com", password: "123456"})
    await STORE.fetchContacts();
    STORE.user = user
    DOMHandler.load(HomePage)
  } catch (error) {
    console.log(error);
  }
}

init()

