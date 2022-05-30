import { renderInput } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { login } from "../services/sessions-service.js";
import STORE from "../store.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";
import SignupPage from "./signup.js";

function renderLogin() {
  const { loginError } = LoginPage.state;
  return `
  <header class="container is-max-desktop">
  <a class="navbar-item" href="../../index.html">
    <h1>📕 Login</h1>
  </a>
  </header>
  <main class="container is-max-desktop">
  <!-- form -->
  <form action="" class="form">
    <div class="formBody">
      ${renderInput("email", "email", "email", loginError)}        
      ${renderInput("password", "password", "password", loginError, "passwordBox", `minlength="6" required`)}
      ${
        loginError
          ? `<p class="tag is-danger is-light"> 😨 ${loginError}</p>`
          : ""
      }
    </div>

    <div class="linksFooter field">
      <div class="control">
        <a id="to-signup-btn" class="button is-link is-light">Signup</a>
      </div>
      <div class="control">
        <button
          type="submit"
          class="button is-link"
          id="submit-btn"
        />Login</button>
      </div>
    </div>
  </form>
  </main>`;
}

const $ = (selector) => document.querySelector(selector);

function listenSubmitForm() {
  const $form = $(".form");
  $("#to-signup-btn").addEventListener("click", () => {
    loadingPage();
    setTimeout(() => {
      DOMHandler.load(SignupPage);
      LoginPage.state.loginError = null;
    }, 800);
  });
  $form.addEventListener("submit", async (event) => {
    $("#submit-btn").classList.toggle("is-loading");
    try {
      event.preventDefault();
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };

      const user = await login(credentials);
      STORE.user = user;

      setTimeout(function () {
        loadingPage();
        setTimeout(async () => {
          await STORE.fetchContacts();
          DOMHandler.load(HomePage);
        }, 500);
      }, 500);
    } catch (error) {
      LoginPage.state.loginError = error.message;
      setTimeout(function () {
        DOMHandler.reload();
      }, 1000);
    }
  });
}

const LoginPage = {
  toString() {
    return renderLogin();
  },
  addListeners() {
    return listenSubmitForm();
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
