import { tokenKey } from "../config.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    // const user = await getUser()
    // STORE.user = user

    // await STORE.fetchCategories();
    DOMHandler.load(LoginPage);
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();
