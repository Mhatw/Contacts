import STORE from "../store.js";

function renderContact(contact) {
  return `
    <li>
      <img src="" alt="">
      <p>${contact.name}</p>
      <i class="fas fa-star" data-id=${contact.id}></i>
    </li>`;
}

function renderFavorites() {
  console.log(STORE);
  if (STORE.favorites.length > 0) {
    return `
    <h3>FAVORITES(${STORE.favorites.length})</h3>
    <ul>
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
        <ul>
          ${STORE.contacts.map(contact => renderContact(contact)).join("")}
        </ul>
      </main>
      `;
}

export const HomePage = {
      toString() {
        return render()
      }
      // addListeners() {
        // listenNavigation();
        // if(["expense", "income"].includes(STORE.currenTab)) Expenses.addListeners();
        // if (STORE.currenTab === "profile") Profile.addListeners();
      // }
    }
