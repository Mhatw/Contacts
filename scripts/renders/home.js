import DOMHandler from "../dom-handler.js";
import { editContacts } from "../services/contacts-services.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import { cardHtml } from "./card.js";
import ContactDetail from "./contactProfile.js";
import CreatePage from "./createContact.js";
import loadingPage from "./loading.js";
import LoginPage from "./login.js";

function renderContact(contact, type = "common") {
  return `
    <li>

        ${cardHtml(contact, type)}

    </li>`;
}

function renderFavorites() {
  if (STORE.favorites.length > 0) {
    return `
    <h3 class="tag is-info is-light">FAVORITES (${STORE.favorites.length})</h3>
    <ul class="js-favorite-list">
      ${STORE.favorites
        .map((contact) => renderContact(contact, "favorite"))
        .join("")}
    </ul>
    <hr>
    `;
  } else {
    return ``;
  }
}

function render() {
  // console.log("favorites", STORE);
  return `
  <!-- header -->
  <header class="container is-max-desktop">
  <a class="navbar-item" href="../../index.html">
  <h1>📕 Contactable</h1>
  </a>
  <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </header>
  <main class="container is-max-desktop">
  <div class="container is-max-desktop cardDiv">
        ${renderFavorites()}
        <h3 class="tag is-info is-light">ALL CONTACTS (${
          STORE.contacts.length
        })</h3>
        <ul class="js-contact-list">
          ${STORE.contacts.map((contact) => renderContact(contact)).join("")}
        </ul>
  </div>
    <a id="create-btn" class="button is-link is-large is-rounded"><img src="./assets/add.svg" alt=""></a>
      </main>
      `;
}
function calcMainAddBtn() {
  const box = document.querySelector("main");
  const createBtn = document.querySelector("#create-btn");
  let width = box.offsetWidth;
  let height = box.offsetHeight;
  createBtn.style.transform = `translate(${
    width / 2 - createBtn.offsetWidth
  }px,${height - createBtn.offsetHeight * 2.5}px)`;
  // console.log(createBtn.style.transform);
}

window.addEventListener("resize", calcMainAddBtn);

function listenLogout() {
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

function listenToFavorite() {
  let stars = document.querySelectorAll("#star-common");

  stars.forEach((star) => {
    star.addEventListener("click", async (event) => {
      const favoriteLink = event.target.closest("[data-id]");
      // if (!favoriteLink) return;
      const id = favoriteLink.dataset.id;

      if (STORE.favorites.find((e) => e.id == id)) return;
      await editContacts(id, { favorite: true }); // request api
      STORE.favoriteContact(id);
      DOMHandler.reload();
    });
  });
}
function listenToUnFavorite() {
  let stars = document.querySelectorAll("#star-favorite");

  stars.forEach((star) => {
    star.addEventListener("click", async (event) => {
      const favoriteLink = event.target.closest("[data-id]");
      // // if (!favoriteLink) return;
      const id = favoriteLink.dataset.id;

      await editContacts(id, { favorite: false }); // request api
      STORE.unFavoriteContact(id);
      DOMHandler.reload();
    });
  });
}

function listenCreate() {
  const createBtn = document.querySelector("#create-btn");
  createBtn.addEventListener("click", (event) => {
    event.preventDefault();
    setTimeout(function () {
      loadingPage();
      setTimeout(() => {
        // await STORE.fetchContacts();
        DOMHandler.load(CreatePage);
      }, 500);
    }, 500);
  });
}

function openContact() {
  let contacts = document.querySelectorAll("#contact-card-left");

  contacts.forEach((contact) => {
    contact.addEventListener("click", async (event) => {
      const contactCardSelected = event.target.closest("[data-id]");
      // if (!contactCardSelected) return;
      const id = contactCardSelected.dataset.id;
      STORE.currentContact = id;
      setTimeout(function () {
        loadingPage();
        setTimeout(() => {
          DOMHandler.load(ContactDetail);
        }, 500);
      }, 500);
    });
  });
}

// function listenContact() {
//   // const contactCard = document.querySelector("#contact-card");
//   // contactCard.addEventListener('click', (event) => {
//   const ul = document.querySelector(".js-favorite-list");

//   ul.addEventListener("click", async (event) => {
//     event.preventDefault();
//     try {
//       const current = event.target.closest("[data-id]");
//       if (!current) return;

//       const id = current.dataset.id;
//       let currentContact = STORE.contacts.find((c) => c.id == id);

//       STORE.currentContact = currentContact;
//       DOMHandler.load(ContactDetail);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }
export const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenCreate(),
      // listenContact(),
      calcMainAddBtn(),
      listenToUnFavorite(),
      listenLogout(),
      listenToFavorite(),
      openContact();
  },
};
