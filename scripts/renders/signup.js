import { renderInput } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { login } from "../services/sessions-service.js";
import { signup } from "../services/users-service.js";
import STORE from "../store.js";
import { HomePage } from "./home.js";
import loadingPage from "./loading.js";
import LoginPage from "./login.js";

function renderSignup() {
  const { SignupError } = SignupPage.state;
  return `
  <header class="container is-max-desktop">
<a class="navbar-item" href="../../index.html">
  <h1>📕 Contacts App</h1>
</a>
</header>
<main class="container is-max-desktop signupView">
<!-- form -->
<form action="" class="form">
  <div class="formBody">
  <h2 class="titleSection">Sign up</h2>
    ${renderInput("email", "email", "email", SignupError)}       
    ${renderInput(
      "password",
      "password",
      "password",
      SignupError,
      "passwordBox",
      `minlength="6" required`
    )}
    ${
      SignupError
        ? `<p class="tag is-danger is-light"> 😨 ${SignupError}</p>`
        : ""
    }
    <p>you already have an account? <a id="to-login-btn2" href="#">login</a></p>
  </div>

  <div class="linksFooter field">
    <div class="control">
      <a id="to-login-btn" class="button is-success is-light">Login</a>
    </div>
    <div class="control">
      <button
        type="submit"
        class="button is-success"
        id="submit-btn"
      />Create Account</button>
    </div>
  </div>
</form>
</main>`;
}

const $ = (selector) => document.querySelector(selector);

function listenSubmitForm() {
  const $form = $(".form");
  $("#to-login-btn").addEventListener("click", () => {
    loadingPage();
    setTimeout(() => {
      DOMHandler.load(LoginPage);
      SignupPage.state.SignupError = null;
    }, 800);
  });
  $("#to-login-btn2").addEventListener("click", () => {
    loadingPage();
    setTimeout(() => {
      DOMHandler.load(LoginPage);
      SignupPage.state.SignupError = null;
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

      const user = await signup(credentials);
      const userlogin = await login(credentials);
      STORE.user = userlogin;
      setTimeout(function () {
        loadingPage();
        setTimeout(async () => {
          await STORE.fetchContacts();
          DOMHandler.load(HomePage);
        }, 500);
      }, 500);
    } catch (error) {
      SignupPage.state.SignupError = error.message;
      setTimeout(function () {
        DOMHandler.reload();
      }, 800);
    }
  });
}

const SignupPage = {
  toString() {
    return renderSignup();
  },
  addListeners() {
    return listenSubmitForm();
  },
  state: {
    SignupError: null,
  },
};

export default SignupPage;
