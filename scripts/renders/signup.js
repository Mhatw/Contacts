import DOMHandler from "../dom-handler.js";
import { signup } from "../services/users-service.js";
import loadingPage from "./loading.js";
import LoginPage from "./login.js";
// render Signup

function renderSignup() {
  const { SignupError } = SignupPage.state;
  return `<header class="container is-max-desktop">
<a class="navbar-item" href="../../index.html">
  <h1>📕 Sign Up</h1>
</a>
<!-- <button class="button is-danger is-light is-small">logout</button> -->
</header>
<main class="container is-max-desktop">
<!-- form -->
<form action="" class="form">
  <div class="formBody">
    <div class="mailBox control">
      <input
        class="input ${SignupError ? "is-danger" : ""}"
        type="email"
        id="email"
        name="email"
        placeholder="email"
      />
      </div>
      
      
      <div class="passwordBox control">
      <input
      class="input ${SignupError ? "is-danger" : ""}"
      type="password"
      name="password"
      placeholder="password"
      minlength="8"
      required
      />
      </div>
      ${
        SignupError
          ? `<p class="tag is-danger is-light"> 😨 ${SignupError}</p>`
          : ""
      }
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

// listener

function listenSubmitForm() {
  const $form = $(".form");
  $("#to-login-btn").addEventListener("click", () => {
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
      // STORE.user = user;
      console.log(credentials, user);

      // await STORE.fetchCategories();
      setTimeout(function () {
        DOMHandler.load(LoginPage);
      }, 800);
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
