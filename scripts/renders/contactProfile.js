const avatar = (current) =>
  ({
    Friends: "../../assets/friend.svg",
    Family: "../../assets/family.svg",
    Work: "../../assets/work.svg",
    Acquaintance: "../../assets/acq.svg",
  }[current]);

function renderProfile(contact) {
  return `
  <!-- header -->
  <header class="container is-max-desktop">
  <a class="navbar-item" href="#">
  <h1>Contactable</h1>
  </a>
  <button id="logout-btn" class="button is-danger is-light is-small">logout</button>
  </header>
  <figure class="image is-48x48">
          <img
            src="${avatar(contact.relation)}"
            alt="Placeholder image"
          />
        </figure>
  <h2>${contact.name}</h2>
  <span>${contact.relation}</span>

  <div>
    
      <p>Number: <span>${contact.number}</span></p>
      <p>Email: <span>${contact.email}</span></p>
    
  </div>

  <div class="linksFooter field">
      <div class="control">
        <a id="back-btn" class="button is-link is-light">Back</a>
      </div>
      <div class="control">
        <a id="delete-btn" class="button is-link is-light">Delete</a>
      </div>
      <div class="control">
        <a id="edit-btn" class="button is-link is-light">Edit</a>
      </div>
    </div>
  `
}