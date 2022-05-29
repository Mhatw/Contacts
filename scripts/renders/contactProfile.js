import DOMHandler from "../dom-handler.js";
import { deleteContacts } from "../services/contacts-services.js";
import STORE from "../store.js";
import { HomePage } from "./home.js";

let contact = STORE.currentContact;
console.log(contact);
const avatar = (current) =>
  ({
    Friends: "../../assets/friend.svg",
    Family: "../../assets/family.svg",
    Work: "../../assets/work.svg",
    Acquaintance: "../../assets/acq.svg",
  }[current]);

function renderProfile() {
  return `
  <!-- header -->
  <header class="container is-max-desktop">
  <a class="navbar-item" href="#">
  <h1>Contactable</h1>
  </a>
  <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </header>
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
        <a id="back-btn" class="button is-link is-light">Back</a>
      </div>
      <div class="control">
        <a id="delete-btn" class="button is-link is-light">Delete</a>
      </div>
      <div class="control">
        <a id="edit-btn" class="button is-link is-light">Edit</a>
      </div>
    </div>
  `
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
  backBtn.addEventListener('click', (event) => { 
    event.preventDefault();
    DOMHandler.load(HomePage);
  })
}
function listenDelete() {
  const deleteBtn = document.querySelector("#delete-btn");
  deleteBtn.addEventListener('click', async (event) => { 
    
    try {
      event.preventDefault();
      await deleteContacts(STORE.idContact);
      STORE.deleteContact(STORE.idContact);
      DOMHandler.load(HomePage);
    } catch (error) {
      console.log(error);
    }
  })
}
function listenEdit() {
  const editBtn = document.querySelector("#edit-btn");
  editBtn.addEventListener('click', (event) => {
    try {
      event.preventDefault();
      DOMHandler.load(HomePage);
    } catch (error) {
      console.log(error);
    }
  })
}
const ContactDetail = {
  toString() {
    return renderProfile();
  },
  addListeners() {
    return listenBack(), listenDelete(), listenEdit(),listenLogout();
  }
};

export default ContactDetail;