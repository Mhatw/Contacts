import DOMHandler from "../dom-handler.js";
import { editContacts } from "../services/contacts-services.js";
import STORE from "../store.js";

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
      ${STORE.favorites.map(contact => renderContact(contact)).join("")}
    </ul>
    <hr>
    `
  } else {
    return ``
  }
}

function render() {
  return  `
      <!-- header -->
      <header class="container is-max-desktop">
        <a class="navbar-item" href="#">
          <h1>Contactable</h1>
        </a>
        <button class="button is-danger is-light is-small">logout</button>
      </header>
      <main class="container is-max-desktop">
        ${renderFavorites()}
        <h3>CONTACTS(${STORE.contacts.length})</h3>
        <ul class="js-contact-list">
          ${STORE.contacts.map(contact => renderContact(contact)).join("")}
        </ul>
      </main>
      `;
}

function listenToFavorite() {
  const ul = document.querySelector(".js-contact-list")

  ul.addEventListener("click", async (event) => {
    event.preventDefault()
    
    const favoriteLink = event.target.closest("[data-id]")
    if(!favoriteLink) return;

    const id = favoriteLink.dataset.id
    await editContacts(id, {favorite: true}) // request api
    STORE.favoriteContact(id)
    DOMHandler.reload()
  })
}
function listenToUnfavorite() {
  try {
    const ul = document.querySelector(".js-favorite-list")
  
    ul.addEventListener("click", async (event) => {
      event.preventDefault()
      
      const favoriteLink = event.target.closest("[data-id]")
      if(!favoriteLink) return;
  
      const id = favoriteLink.dataset.id
      await editContacts(id, {favorite: false}) // request api
      STORE.unfavoriteContact(id)
      DOMHandler.reload()
    })
  } catch (error) {
    console.log(error);
  }
}


export const HomePage = {
      toString() {
        return render()
      },
      addListeners() {
        listenToFavorite(),
        listenToUnfavorite()
      }
    }
