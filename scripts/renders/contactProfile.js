import { listenLogout, renderHeader } from "../components/header.js";
import DOMHandler from "../dom-handler.js";
import { deleteContacts } from "../services/contacts-services.js";
import STORE from "../store.js";
import EditPage from "./editContact.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";

let id = STORE.currentContact;
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
  return `
  ${renderHeader()}
  <main class="container is-max-desktop">
  <div class="profile">
  <div class="profileBody">

  <h2 class="titleSection">Contact info</h2>
  <!-- img -->
  <figure class="image is-128x128">
          <img 
            src="${avatar(contact.relation)}"
            alt="Placeholder image"
          />
        </figure>
  <h2 class="profileName">${contact.name}</h2>
  <span class="profileRelation">${contact.relation}</span>

  <div class="profileSecond">

      <p>Number: <span class="profileSecondInfo">${contact.number}</span></p>
      <p>Email: <span class="profileSecondInfo">${contact.email}</span></p>
    
  </div>
  </div>
  <div class="linksFooter field">
      <div class="control">
        <a id="back-btn" class="button is-link is-light">Back</a>
      </div>
      <div class="control">
        <a id="delete-btn" class="button is-danger">Delete</a>
      </div>
      <div class="control">
        <a id="edit-btn" class="button is-link">Edit</a>
      </div>
    </div>
    </div>
  </main>`;
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
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        event.preventDefault();
        await deleteContacts(STORE.currentContact);
        STORE.deleteContact(STORE.currentContact);
        DOMHandler.load(HomePage);
      } catch (error) {
        console.log(error);
      }
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
