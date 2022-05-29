import DOMHandler from "../dom-handler.js";
import loadingPage from "../renders/loading.js";
import LoginPage from "../renders/login.js";
import { logout } from "../services/sessions-service.js";

export function renderHeader() {
  return `
  <!-- header -->
  <header class="container is-max-desktop">
  <a class="navbar-item" href="../../index.html">
  <h1>📕 Contact Detail</h1>
  </a>
  <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </header>
  `
}

export function listenLogout() {
  const $logoutBtn = document.querySelector("#logout-btn");
  $logoutBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await logout();
    setTimeout(function () {
      loadingPage();
      setTimeout(() => {
        DOMHandler.load(LoginPage);
      }, 500);
    }, 500);
  });
}