import "./home.page.scss";

export class HomePage extends HTMLElement {
  constructor() {
    super();

    this.connectedCallback();
  }
  connectedCallback() {
    this.innerHTML = `
      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input type="text" class="form-control" pattern="[0-9]+,[0-9]{2}||[0-9]+(\.[0-9]{3})*,[0-9]{2}" required />
      </div>
      <div class="button-group">
        <button type="button" class="btn btn-search">
          <span class="material-symbols-outlined icon"> travel_explore </span>
          Pesquisar
        </button>
        <button type="button" class="btn btn-clean">
          <span class="material-symbols-outlined icon"> close </span>
          Limpar
        </button>
      </div>
      `;
    this.onInit();
  }
  onInit() {}
}
