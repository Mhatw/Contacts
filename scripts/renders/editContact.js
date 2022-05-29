import DOMHandler from "../dom-handler.js";
import { createContacts, editContacts } from "../services/contacts-services.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import ContactDetail from "./contactProfile.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";
import LoginPage from "./login.js";

function renderEdit() {
  let id = STORE.currentContact;
  console.log("asdasd", id, STORE);
  const { createError } = EditPage.state;
  return `
  <div class="container">
    <header>
      <div class="titleLog">
        <h1>📕 Edit Contact </h1>
      </div>
      <div class ="linkOut">
        <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
      </div>
    </header>
    <main>
    <form action="" class="form">
      <div class="formBody">
      
      <div class="mailBox control">
      <input
        class="input is-warning ${createError ? "is-danger" : ""}"
        type="name"
        id="name"
        name="name"
        placeholder="Name"
      />
      </div>
      <div class="mailBox control">
        <input
          class="input is-warning ${createError ? "is-danger" : ""}"
          maxlength="9"
          type="tel"
          id="number"
          name="number"
          placeholder="Number"
        />
        </div>
        <div class="mailBox control">
        <input
          class="input is-warning ${createError ? "is-danger" : ""} "
          type="email"
          id="email"
          name="email"
          placeholder="email"
        />
        </div>
        
        <div class="passwordBox select  ">
          <select name="relation" class="is-warning ${
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
        />Sapeeee</button>
      </div>
    </div>
  </form>
    </main>
  `;
}

function getInfoContact() {
  let id = STORE.currentContact;
  console.log("asdasd33", id, STORE);
  let a = STORE.contacts;
  const info = a.find((e) => e.id == id);
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
  document.querySelector("#cancel-btn").addEventListener("click", (event) => {
    event.preventDefault();
    setTimeout(() => {
      DOMHandler.load(ContactDetail);
      EditPage.state.createError = null;
    }, 800);
  });

  form.addEventListener("submit", async (event) => {
    let id = STORE.currentContact;
    console.log("asdasd", id, STORE);
    document.querySelector("#save-btn").classList.toggle("is-loading"); // class = "is-loading"
    try {
      event.preventDefault();
      const { name, number, email, relation } = event.target;

      const credentials = {
        name: name.value,
        number: number.value,
        email: email.value,
        relation: relation.value,
      };

      const contact = await editContacts(id, credentials);
      let a = STORE.contacts;
      let info = a.find((e) => e.id == "794");
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
    listenSubmitForm(), getInfoContact();
  },
  state: {
    createError: null,
  },
};

export default EditPage;
