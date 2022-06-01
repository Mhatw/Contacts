import { listenLogout, renderHeader } from "../components/header.js";
import { renderInput } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { editContacts } from "../services/contacts-services.js";
import STORE from "../store.js";
import ContactDetail from "./contactProfile.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";

function renderEdit() {
  const { createError } = EditPage.state;
  return `
    ${renderHeader()}    
    <main class="container is-max-desktop">
      <form action="" class="form">
        <div class="formBody">
        <h2 class="titleSection">Edit contact</h2>
        
        ${renderInput("name", "name", "Name", createError)}
        ${renderInput(
          "tel",
          "number",
          "Number",
          createError,
          "mailBox",
          `maxlength="9"`
        )}
        ${renderInput("email", "email", "Email", createError)}
          
          <div class="passwordBox select is-info">
            <select name="relation" class="${
              createError ? "is-danger" : ""
            }" id="relation" required>
              <option value="" disabled selected hidden>Relation</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Work</option>
              <option value="Acquaintance">Acquaintance</option>
            </select>
          </div>
          ${
            createError
              ? `<p class="tag is-danger is-light"> 😨 ${createError}</p>`
              : ""
          }
        </div>
  
        <div class="linksFooter field">
          <div class="control">
            <a id="cancel-btn" class="button is-link is-light">Cancel</a>
          </div>
          <div class="control">
            <button
              type="submit"
              class="button is-link"
              id="save-btn"
            />Save</button>
          </div>
        </div>
      </form>
    </main>
  `;
}

function getInfoContact() {
  let id = STORE.currentContact;
  let contacts = STORE.contacts;
  const info = contacts.find((c) => c.id == id);
  const name = document.querySelector("#name");
  const number = document.querySelector("#number");
  const email = document.querySelector("#email");
  const relation = document.querySelector("#relation");
  name.value = info.name;
  number.value = info.number;
  email.value = info.email;
  relation.value = info.relation;
}

function listenSubmitForm() {
  const form = document.querySelector(".form");
  document.querySelector("#cancel-btn").addEventListener("click", (event) => {
    event.preventDefault();
    setTimeout(() => {
      DOMHandler.load(ContactDetail);
      EditPage.state.createError = null;
    }, 800);
  });

  form.addEventListener("submit", async (event) => {
    let id = STORE.currentContact;
    document.querySelector("#save-btn").classList.toggle("is-loading");
    try {
      event.preventDefault();
      const { name, number, email, relation } = event.target;
      const credentials = {
        name: name.value,
        number: number.value,
        email: email.value,
        relation: relation.value,
      };

      await editContacts(id, credentials);
      let a = STORE.contacts;
      let info = a.find((e) => e.id == id);
      const name2 = document.querySelector("#name");
      const number2 = document.querySelector("#number");
      const email2 = document.querySelector("#email");
      const relation2 = document.querySelector("#relation");
      info.name = name2.value;
      info.number = number2.value;
      info.email = email2.value;
      info.relation = relation2.value;

      setTimeout(function () {
        loadingPage();
        setTimeout(() => {
          DOMHandler.load(HomePage);
        }, 500);
      }, 500);
    } catch (error) {
      EditPage.state.createError = error.message;
      setTimeout(function () {
        DOMHandler.reload();
      }, 1000);
    }
  });
}

const EditPage = {
  toString() {
    return renderEdit();
  },
  addListeners() {
    listenSubmitForm(), getInfoContact(), listenLogout();
  },
  state: {
    createError: null,
  },
};

export default EditPage;
