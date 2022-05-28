export const cardHtml = (contact) => {  
  return `
      <div class="box container is-max-desktop contactCard">
        <!-- img perfil -->
        <figure class="image is-48x48">
          <img
            src="https://bulma.io/images/placeholders/96x96.png"
            alt="Placeholder image"
          />
        </figure>
        <!-- name -->
        <p class="is-6">${contact.name}</p>
        <!-- icon -->
        <span class="icon">
          <i class="fas fa-star"></i>
        </span>
      </div>`;
}