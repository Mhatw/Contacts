import DOMHandler from "./scripts/dom-handler.js";
import { HomePage } from "./scripts/renders/home.js";
import { tokenKey } from "./scripts/config.js";
import LoginPage from "./scripts/renders/login.js";
import STORE from "./scripts/store.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    await STORE.fetchContacts();
    DOMHandler.load(HomePage);
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();
