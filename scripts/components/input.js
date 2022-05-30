
export function renderInput(type, id, placeholder, createError, divClass="mailBox", ...args) {
  return `
  <div class="${divClass} control">
  <input
    class="input ${createError ? "is-danger" : ""}"
    type="${type ? type : "text" }"
    ${args}
    id="${id}"
    name="${id}"
    placeholder="${placeholder}"
  />
  </div>
  `
}
