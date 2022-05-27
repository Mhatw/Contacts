export const loginHtml = `
<header class="container is-max-desktop">
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
        class="input"
        type="email"
        id="email"
        name="email"
        placeholder="email"
      />
    </div>
    <div class="passwordBox control">
      <input
        class="input"
        type="password"
        name="password"
        placeholder="password"
        minlength="8"
        required
      />
    </div>
  </div>

  <div class="linksFooter field">
    <div class="control">
      <a class="button is-link is-light is-small">Signup</a>
    </div>
    <div class="control">
      <input
        type="submit"
        class="button is-link is-small"
        value="Login"
      />
    </div>
  </div>
</form>
</main>`;
