import Currency from "@tadashi/currency";
import { FormSelect } from "../../components/form-select/form-select";
import { COUNTRY_LIST } from "../../constants/countrys";
import { ExchangeRateApiResponse } from "../../constants/rates";
import { Toasts } from "../../toasts/toast";
import "./home.page.scss";

export class HomePage extends HTMLElement {
  imports = [FormSelect];
  $input: HTMLInputElement;
  $buttonSearch: HTMLButtonElement;
  $buttonClean: HTMLButtonElement;
  $buttonAlt: HTMLButtonElement;
  $change: HTMLButtonElement;
  $fromCard: HTMLElement;
  $textsOfCards: NodeListOf<HTMLElement>;
  maskInstance: typeof Currency;
  $toCard: HTMLElement;
  $symbolToCoin: HTMLElement;

  connectedCallback() {
    this.innerHTML = this.createInnerHTML();
    const $firstForm = this.querySelector(".form-group");
    const $secondForm = this.querySelector(".form-group-2");

    $firstForm.innerHTML += this.createFormSelect();
    $secondForm.innerHTML += this.createFormSelect();

    this.recoveryElementRef();
    this.addListeners();
  }

  recoveryElementRef() {
    this.$input = document.querySelector(".form-control");
    this.$buttonSearch = document.querySelector(".btn-search");
    this.$buttonClean = document.querySelector(".btn-clean");
    this.$buttonAlt = document.querySelector(".btn-alt");
    this.$fromCard = document.querySelector(".from span");
    this.$toCard = document.querySelector(".to span");
    this.$textsOfCards = document.querySelectorAll(".card-text");
    this.$symbolToCoin = document.querySelector(".input-group-text");
    this.maskInstance = new Currency(this.$input);
  }

  private addListeners(): void {
    this.onClearInputEvent();
    this.onKeyUpEvent();
    this.onSearchClickEvent();
    this.onSelectChanges();
    this.getCurrency();
    this.onChangesCurrency();
  }
  onChangesCurrency() {
    this.$buttonAlt.addEventListener("click", () => {
      const [$fromForm, $toForm] = document.querySelectorAll<HTMLElement>("form-select");
      const changeFrom = $fromForm.innerHTML;
      const changeTo = $toForm.innerHTML;
      $fromForm.innerHTML = changeTo;
      $toForm.innerHTML = changeFrom;
      const toValue = $toForm.getAttribute("value");
      const fromValue = $fromForm.getAttribute("value");
      $toForm.setAttribute("value", fromValue);
      $fromForm.setAttribute("value", toValue);
      this.getCurrency();
    });
  }

  private onSelectChanges() {
    const [$fromForm, $toForm] = document.querySelectorAll<HTMLElement>("form-select");

    $fromForm.addEventListener("change", () => this.changeFromCard($fromForm));

    $toForm.addEventListener("change", () => this.changeToCard($toForm));
  }

  private changeToCard($toForm: HTMLElement) {
    const value = $toForm.getAttribute("value");
    const optionToSelected = COUNTRY_LIST.find((country) => country.currency === value);
    if (!optionToSelected) return;
    this.$toCard.innerText = optionToSelected.name;
  }

  private changeFromCard($fromForm: HTMLElement) {
    const value = $fromForm.getAttribute("value");
    const optionFromSelected = COUNTRY_LIST.find((country) => country.currency === value);
    if (!optionFromSelected) return;

    this.$fromCard.innerText = optionFromSelected.name;
    this.$symbolToCoin.innerText = optionFromSelected.symbol;
  }

  private getCurrency() {
    const [$fromForm, $toForm] = document.querySelectorAll<HTMLElement>("form-select");
    const currencyFrom = $fromForm.getAttribute("value");
    const currencyTo = $toForm.getAttribute("value");
    this.changeToCard($toForm);
    this.changeFromCard($fromForm);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`)
      .then<ExchangeRateApiResponse>((response) => response.json())
      .then((data) => {
        const valueInput = +this.$input.value.replaceAll(".", "").replace(",", ".");

        const formatCurrencyFrom = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(valueInput);

        const formatCurrencyTo = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(valueInput * data.rates[currencyTo]);

        const [$currentValue, $finalValue] = this.$textsOfCards;

        $currentValue.innerText = formatCurrencyFrom;
        $finalValue.innerText = formatCurrencyTo;
      });
  }
  private onKeyUpEvent() {
    this.$input.addEventListener("keyup", (event) => {
      const eventKey = event.key;
      if (eventKey == "Enter") {
        this.getCurrency();
        Toasts.successToast("olá");
      }
    });
  }

  private onSearchClickEvent() {
    this.$buttonSearch.addEventListener("click", () => {
      this.getCurrency();
    });
  }

  private onClearInputEvent() {
    this.$buttonClean.addEventListener("click", () => {
      if (this.$input?.value) {
        this.$input.value = "";
      }
    });
  }
  private createInnerHTML() {
    return `
     <div class="input-group mb-3">
      <span class="input-group-text">$</span>
      <input
        type="text"
        class="form-control"
        autocomplete="transaction-currency"
        value="0,00"
        pattern="[0-9]+,[0-9]{2}||[0-9]+(.[0-9]{3})*,[0-9]{2}"
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
    <div class="form">
      <div class="form-group">
        <label>Converter de :</label>
      </div>
      <button type="button" class="btn btn-alt">
        <span class="material-symbols-outlined">sync_alt</span>
      </button>
      <div class="form-group-2">
        <label>Para :</label>
      </div>
    </div>
    <h5 class="h5">Resultado da conversão</h5>
    <div class="result">
      <div class="card">
        <div class="card-header from">Conversão de:<span></span></div>
        <div class="card-body">
          Valor a converter:
          <div class="card-text"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header to">Para:<span></span></div>
        <div class="card-body">
          Resultado da conversão:
          <div class="card-text"></div>
        </div>
      </div>
    </div>
     <div id="toast-content"></div>
      `;
  }
  private createFormSelect() {
    const options = COUNTRY_LIST.map((value) => {
      const currency = value.currency;
      const unicode = currency.slice(0, -1).toLowerCase();
      return `<div class="option" value="${currency}">
                <span class="fi fi-${unicode}"></span>
                 ${currency}
                </div> 
                `;
    }).join("");
    return `
       <form-select placeholder="Selecione" >
       ${options}
       </form-select> 
      `;
  }
}
