import Currency from "@tadashi/currency";
import "./home.page.scss";
export class HomePage extends HTMLElement {
  $input: HTMLInputElement;
  $search: HTMLButtonElement;
  $clean: HTMLButtonElement;
  connectedCallback() {
    this.innerHTML = `
    <div class="input-group mb-3">
      <span class="input-group-text">$</span>
      <input
        type="text"
        class="form-control"
        value="0,00"
        autocomplete="transaction-currency"
        pattern="[0-9]+,[0-9]{2}||[0-9]+(\.[0-9]{3})*,[0-9]{2}"
        required
      />
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

  onInit() {
    this.$input = document.querySelector(".form-control");
    this.$search = document.querySelector(".btn-search");
    this.$clean = document.querySelector(".btn-clean");
    const mask = new Currency(this.$input);
    console.log(mask);
    this.addEvents();
  }

  private addEvents(): void {
    this.cleanValue();
    this.inputValue();
    this.searchValue();
  }
  private inputValue() {
    this.$input.addEventListener("keyup", (event) => {
      const eventKey = event.key;

      if (eventKey == "Enter") {
        this.$input.value;
      }
    });
  }

  private searchValue() {
    this.$search.addEventListener("click", () => {
      this.$input?.value;
    });
  }

  private cleanValue() {
    this.$clean.addEventListener("click", () => {
      if (this.$input?.value) {
        this.$input.value = "";
      }
    });
  }
}
