import DOMHandler from "../dom-handler.js";
import { editContacts } from "../services/contacts-services.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import loadingPage from "./loading.js";
import LoginPage from "./login.js";

function renderContact(contact) {
  return `
    <li>
      <img src="" alt="">
      <p>${contact.name}</p>
      <a data-id=${contact.id}><i class="fas fa-star"></i></a>
    </li>`;
}

function renderFavorites() {
  if (STORE.favorites.length > 0) {
    return `
    <h3>FAVORITES(${STORE.favorites.length})</h3>
    <ul class="js-favorite-list">
      ${STORE.favorites.map((contact) => renderContact(contact)).join("")}
    </ul>
    <hr>
    `;
  } else {
    return ``;
  }
}

function render() {
  return `
  <!-- header -->
  <header class="container is-max-desktop">
  <a class="navbar-item" href="#">
  <h1>Contactable</h1>
  </a>
  <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </header>
  <main class="container is-max-desktop">
  <div>
        ${renderFavorites()}
        <h3>CONTACTS(${STORE.contacts.length})</h3>
        <ul class="js-contact-list">
          ${STORE.contacts.map((contact) => renderContact(contact)).join("")}
        </ul>
  </div>
      </main>
      `;
}

function listenToFavorite() {
  const ul = document.querySelector(".js-contact-list");
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
  ul.addEventListener("click", async (event) => {
    event.preventDefault();

    const favoriteLink = event.target.closest("[data-id]");
    if (!favoriteLink) return;

    const id = favoriteLink.dataset.id;
    await editContacts(id, { favorite: true }); // request api
    STORE.favoriteContact(id);
    DOMHandler.reload();
  });
}
function listenToUnfavorite() {
  try {
    const ul = document.querySelector(".js-favorite-list");

    ul.addEventListener("click", async (event) => {
      event.preventDefault();

      const favoriteLink = event.target.closest("[data-id]");
      if (!favoriteLink) return;

      const id = favoriteLink.dataset.id;
      await editContacts(id, { favorite: false }); // request api
      STORE.unfavoriteContact(id);
      DOMHandler.reload();
    });
  } catch (error) {
    console.log(error);
  }
}

export const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenToFavorite(), listenToUnfavorite();
  },
};
