import { listenLogout, renderHeader } from "../components/header.js";
import DOMHandler from "../dom-handler.js";
import { createContacts } from "../services/contacts-services.js";
import STORE from "../store.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";
import { renderInput } from "/scripts/components/input.js";

function renderCreate() {
  const { createError } = CreatePage.state;
  return `
    ${renderHeader()}   
    <main>
      <form action="" class="form">
        <div class="formBody">
          
          ${renderInput("name", "name", "Name", createError)}
          ${renderInput("tel", "number", "Number", createError, "mailBox", `maxlength="9"`)}
          ${renderInput("email", "email", "Email", createError)}

          <div class="passwordBox select ">
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

function listenCancel() {
  document.querySelector("#cancel-btn").addEventListener("click", (event) => {
    event.preventDefault();
    setTimeout(() => {
      DOMHandler.load(HomePage);
      CreatePage.state.createError = null;
    }, 800);
  });
}

function listenSubmitForm() {
  const form = document.querySelector(".form");

  form.addEventListener("submit", async (event) => {
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
      const contact = await createContacts(credentials);
      STORE.contacts.push(contact);

      setTimeout(function () {
        loadingPage();
        setTimeout(() => {
          DOMHandler.load(HomePage);
        }, 500);
      }, 500);
    } catch (error) {
      CreatePage.state.createError = error.message;
      setTimeout(function () {
        DOMHandler.reload();
      }, 1000);
    }
  });
}

const CreatePage = {
  toString() {
    return renderCreate();
  },
  addListeners() {
    return listenSubmitForm(), listenLogout(), listenCancel();
  },
  state: {
    createError: null,
  },
};

export default CreatePage;
