import { tokenKey } from "../config.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login.js";
import SignupPage from "./signup.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    DOMHandler.load(LoginPage);
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();
