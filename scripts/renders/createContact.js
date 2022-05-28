import DOMHandler from "../dom-handler.js";
import { createContacts } from "../services/contacts-services.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";
import LoginPage from "./login.js";

function renderCreate() {
  const { createError } = CreatePage.state;
  return `
  <div class="container">
    <header>
      <div class="titleLog">
        <h1>Create new contact</h1>
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
        class="input ${createError ? "is-danger" : ""}"
        type="name"
        id="name"
        name="name"
        placeholder="Name"
      />
      </div>
      <div class="mailBox control">
        <input
          class="input ${createError ? "is-danger" : ""}"
          maxlength="9"
          type="tel"
          id="number"
          name="number"
          placeholder="Number"
        />
        </div>
        <div class="mailBox control">
        <input
          class="input ${createError ? "is-danger" : ""} "
          type="email"
          id="email"
          name="email"
          placeholder="email"
        />
        </div>
        
        <div class="passwordBox control">
          <select name="relation" class="select ${createError ? "is-danger" : ""}" id="relation">
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
  `
}

