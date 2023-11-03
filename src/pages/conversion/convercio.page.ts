import Currency from "@tadashi/currency";
import ApexCharts from "apexcharts";
import { FormSelect } from "../../components/form-select/form-select";
import { OPTIONS_CURRENCY } from "../../constants/charts";
import { COUNTRY_LIST } from "../../constants/countrys";
import { ExchangeRateApiResponse } from "../../interface/rates";
import { Toasts } from "../../toasts/toast";
import "./conversion.page.scss";
export class ConversionPage extends HTMLElement {
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
  $fromForm: FormSelect;
  $toForm: FormSelect;
  $chartCurrency: ApexCharts;

  connectedCallback() {
    this.innerHTML = this.createInnerHTML();
    const $firstForm = this.querySelector(".form-group");
    const $secondForm = this.querySelector(".form-group-2");

    $firstForm.innerHTML += this.createFormSelect();
    $secondForm.innerHTML += this.createFormSelect();

    const [$fromFrom, $toForm] = this.recoveryFormSelects();

    this.$fromForm = $fromFrom;
    this.$toForm = $toForm;
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
    this.onChangesCurrency();
  }
  onChangesCurrency() {
    this.$buttonAlt.addEventListener("click", () => {
      const fromValue = this.$fromForm.value;
      const toValue = this.$toForm.value;

      if (!fromValue || !toValue) {
        return Toasts.error("Selecione os dois valores");
      }
      const changeFrom = this.$fromForm.innerHTML;
      const changeTo = this.$toForm.innerHTML;

      this.$fromForm.innerHTML = changeTo;
      this.$toForm.innerHTML = changeFrom;

      this.$fromForm.value = toValue;
      this.$toForm.value = fromValue;

      if (toValue && fromValue) {
        Toasts.success(`Valor ${fromValue} alterado para ${toValue}`);
      }

      this.getCurrency();
    });
  }

  private recoveryFormSelects(): NodeListOf<FormSelect> {
    return document.querySelectorAll<FormSelect>("form-select");
  }

  private onSelectChanges() {
    this.$fromForm.addEventListener("change", () => this.changeFromCard());
    this.$toForm.addEventListener("change", () => this.changeToCard());
  }

  private changeFromCard() {
    const value = this.$fromForm.value;
    const optionFromSelected = this.findCountry(value);

    if (!optionFromSelected) return;

    this.$fromCard.innerText = optionFromSelected.name;
    this.$symbolToCoin.innerText = optionFromSelected.symbol;
  }
  private changeToCard() {
    const value = this.$toForm.value;
    const optionToSelected = this.findCountry(value);

    if (!optionToSelected) return;

    this.$toCard.innerText = optionToSelected.name;
  }

  private findCountry(code: string) {
    return COUNTRY_LIST.find((country) => country.currency === code);
  }

  private getCurrency() {
    const currencyFrom = this.$fromForm.value;
    const currencyTo = this.$toForm.value;

    this.changeToCard();
    this.changeFromCard();

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`)
      .then<ExchangeRateApiResponse>((response) => response.json())
      .then((data) => {
        const valueInput = this.removeMask(this.$input.value);

        if (valueInput < 1) return;

        const options = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };

        const conversionValue = valueInput * data.rates[currencyTo];
        const numberFormat = new Intl.NumberFormat("en-US", options);

        const formatCurrencyFrom = numberFormat.format(valueInput);
        const formatCurrencyTo = numberFormat.format(conversionValue);

        const [$currentValue, $finalValue] = this.$textsOfCards;

        $currentValue.innerText = formatCurrencyFrom;
        $finalValue.innerText = formatCurrencyTo;

        const valueFrom = this.$fromForm.value;

        const valueTo = this.$toForm.value;

        this.onChart(valueInput, conversionValue, valueFrom, valueTo);
      });
  }

  private onChart(valueInput: number, conversionValue: number, valueFrom: string, valueTo: string) {
    const listCurrency = [+valueInput.toFixed(2), +conversionValue.toFixed(2)];
    OPTIONS_CURRENCY.series = [valueFrom, valueTo].map((value, index) => {
      return {
        name: value,
        data: [listCurrency[index]],
      };
    });
    OPTIONS_CURRENCY.xaxis.categories = Array.from(
      { length: Math.max(...OPTIONS_CURRENCY.series.map((value) => value.data.length)) },
      (_, k) => listCurrency[k].toFixed(2) ?? "-"
    );
    this.$chartCurrency = new ApexCharts(document.querySelector("#chart-currency"), OPTIONS_CURRENCY);

    this.$chartCurrency.render();
    this.$chartCurrency.updateSeries(OPTIONS_CURRENCY.series);
  }

  private removeMask(value: string) {
    const number = value.replaceAll(".", "").replace(",", ".");
    return isNaN(+number) ? 1 : +number;
  }

  private onKeyUpEvent() {
    this.$input.addEventListener("keyup", (event) => {
      const eventKey = event.key;

      if (eventKey == "Enter") {
        this.validateSearch();
      }
    });
  }

  private onSearchClickEvent() {
    this.$buttonSearch.addEventListener("click", () => this.validateSearch());
  }

  private validateSearch() {
    const currencyFrom = this.$fromForm.value;
    const currencyTo = this.$toForm.value;
    const value = this.$input.value;

    if (!currencyFrom || !currencyTo) {
      return Toasts.error("Selecione os dois valores");
    }

    const isValidValue = value != "0,00" && value != "";

    const alertFn = isValidValue
      ? Toasts.success.bind(Toasts, "Valor convertido com sucesso")
      : Toasts.error.bind(Toasts, "Digite um valor valido");

    alertFn();
    this.getCurrency();
  }

  private onClearInputEvent() {
    this.$buttonClean.addEventListener("click", () => {
      this.resetPage();
      Toasts.success("Valor limpo com sucesso");
    });
  }
  private resetPage() {
    const [$currentValue, $finalValue] = this.$textsOfCards;

    this.$fromForm.value = "";
    this.$fromForm.innerHTML = "Selecione";
    this.$toForm.innerHTML = "Selecione";
    this.$toForm.value = "";
    $currentValue.innerText = "";
    $finalValue.innerText = "";
    this.$fromCard.innerText = "";
    this.$toCard.innerText = "";
    this.$input.value = "0,00";
    this.$symbolToCoin.innerText = "$";
  }

  private createInnerHTML() {
    return /*html*/ `
     <h1 class="title">Conversor de Moedas</h1>
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
    <div id="chart-currency"></div>
      `;
  }
  private createFormSelect() {
    const options = [...COUNTRY_LIST]
      .map((value) => {
        const currency = value.currency;
        const unicode = currency.slice(0, -1).toLowerCase();
        return /*html*/ `
      <div class="option" value="${currency}">
      <span class="fi fi-${unicode}"></span>
      ${currency}
      </div> `;
      })
      .join("");
    return /*html*/ `
       <form-select placeholder="Selecione" >
       ${options}
       </form-select> 
      `;
  }
}
