import DOMHandler from "../dom-handler.js";
import { login } from "../services/sessions-service.js";
import loadingPage from "./loading.js";
import SignupPage from "./signup.js";

// render login
function renderLogin() {
  const { loginError } = LoginPage.state;
  return `<header class="container is-max-desktop">
<a class="navbar-item" href="#">
  <h1>Login</h1>
</a>
<!-- <button class="button is-danger is-light is-small">logout</button> -->
</header>
<main class="container is-max-desktop">
<!-- form -->
<form action="" class="form">
  <div class="formBody">
    <div class="mailBox control">
      <input
        class="input ${loginError ? "is-danger" : ""}"
        type="email"
        id="email"
        name="email"
        placeholder="email"
      />
      </div>
      
      
      <div class="passwordBox control">
      <input
      class="input ${loginError ? "is-danger" : ""}"
      type="password"
      name="password"
      placeholder="password"
      minlength="8"
      required
      />
      </div>
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

// listener

function listenSubmitForm() {
  const $form = $(".form");
  $("#to-signup-btn").addEventListener("click", () => {
    loadingPage();
    setTimeout(() => {
      DOMHandler.load(SignupPage);
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
      // STORE.user = user;
      console.log(credentials, user);

      // await STORE.fetchCategories();
      setTimeout(function () {
        DOMHandler.load(LoginPage);
      }, 1000);
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
