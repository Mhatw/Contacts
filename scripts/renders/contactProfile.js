import DOMHandler from "../dom-handler.js";
import { deleteContacts } from "../services/contacts-services.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import EditPage from "./editContact.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";
import LoginPage from "./login.js";

let id = STORE.currentContact;
console.log("this", id);
const avatar = (current) =>
  ({
    Friends: "../../assets/friend.svg",
    Family: "../../assets/family.svg",
    Work: "../../assets/work.svg",
    Acquaintance: "../../assets/acq.svg",
  }[current]);

function renderProfile() {
  id = STORE.currentContact;
  let contact = STORE.contacts.find((c) => c.id == id);
  console.log(id, "this", contact);
  return `
  <!-- header -->
  <header class="container is-max-desktop">
  <a class="navbar-item" href="../../index.html">
  <h1>📕 Contact Detail</h1>
  </a>
  <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </header>
  <main class="container is-max-desktop">
  <figure class="image is-48x48">
          <img
            src="${avatar(contact.relation)}"
            alt="Placeholder image"
          />
        </figure>
  <h2>${contact.name}</h2>
  <span>${contact.relation}</span>

  <div>
    
      <p>Number: <span>${contact.number}</span></p>
      <p>Email: <span>${contact.email}</span></p>
    
  </div>

  <div class="linksFooter field">
      <div class="control">
        <a id="back-btn" class="button is-link is-inverted">Back</a>
      </div>
      <div class="control">
        <a id="delete-btn" title="this feature is in progress" class="button is-danger " Disabled>Delete</a>
      </div>
      <div class="control">
        <a id="edit-btn" class="button is-link">Edit</a>
      </div>
    </div>
  </main>`;
}
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
function listenBack() {
  const backBtn = document.querySelector("#back-btn");
  backBtn.addEventListener("click", (event) => {
    event.preventDefault();
    setTimeout(function () {
      loadingPage();
      setTimeout(() => {
        DOMHandler.load(HomePage);
      }, 500);
    }, 500);
  });
}
function listenDelete() {
  const deleteBtn = document.querySelector("#delete-btn");
  deleteBtn.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      await deleteContacts(STORE.idContact);
      STORE.deleteContact(STORE.idContact);
      DOMHandler.load(HomePage);
    } catch (error) {
      console.log(error);
    }
  });
}
function listenEdit() {
  const editBtn = document.querySelector("#edit-btn");
  editBtn.addEventListener("click", (event) => {
    try {
      event.preventDefault();
      DOMHandler.load(EditPage);
    } catch (error) {
      console.log(error);
    }
  });
}
const ContactDetail = {
  toString() {
    return renderProfile();
  },
  addListeners() {
    return listenBack(), listenDelete(), listenEdit(), listenLogout();
  },
};

export default ContactDetail;
