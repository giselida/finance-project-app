import { Cliente } from "../configuration/configuration.page";
import "./account.page.scss";
export class AccountPage extends HTMLElement {
  $inputRange: HTMLInputElement;
  $creditValue: HTMLElement;
  clients: Cliente[];
  clientLogged: Cliente;

  constructor() {
    super();
    this.clients = JSON.parse(localStorage.getItem("clients") ?? "[]");
    this.clientLogged = JSON.parse(localStorage.getItem("client") ?? "{}");
  }

  connectedCallback() {
    this.createInnerHtml();
    this.recoveryElementRef();
    this.addListeners();
  }
  private recoveryElementRef() {
    const $card = document.querySelector<HTMLElement>(".card");
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");
    this.$creditValue = document.querySelector(".credit-value");
    this.$inputRange = document.querySelector("input[type='range']");

    if (!this.clientLogged.id) {
      $card.style.display = "none";
      $accountInfo.style.display = "block";
    }
  }

  private setRangeColor() {
    const { value, max } = this.$inputRange;
    const progress = (+value / +max) * 100;

    this.$inputRange.style.setProperty(
      "--input-range-color",
      `linear-gradient(to right, #FE5E71 0%, #FE5E71 ${progress}%, #FCD3E4 ${progress}%, #FCD3E4 100%)`
    );
  }
  private addListeners() {
    this.setRangeColor();
    this.rangeListener();
  }

  private rangeListener() {
    this.$inputRange.addEventListener("input", () => {
      const formRangeValue = +this.$inputRange.value;
      this.$creditValue.textContent = `Limite de crédito: ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(formRangeValue)}`;
      this.clientLogged.limitCredit = formRangeValue;
      this.setRangeColor();
    });
  }

  disconnectedCallback() {
    localStorage.setItem("client", JSON.stringify(this.clientLogged));
    localStorage.setItem("clients", JSON.stringify(this.clients));
  }

  private createInnerHtml() {
    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const { name, accountNumber, accountAmount, limitCredit } = this.clientLogged;
    this.innerHTML = /*html*/ `
<span class="account-info"
  >Você não possui uma conta cadastrada,
  <a href="#configurations">cadastrar uma conta</a>
</span>
<div class="card mb-2">
  <div class="card-header">Conta selecionada</div>
  <div class="card-body">
    <div class="card-title">Nome: ${name ?? ""}</div>
    <div class="card-title">Numero da conta: ${accountNumber ?? ""}</div>
    <div class="card-title">Saldo: ${currencyFormatter.format(accountAmount ?? 0)}</div>
    <div class="credit-value">Limite de crédito: ${currencyFormatter.format(limitCredit ?? 0)}</div>
    <div class="mt-3">
      <label for="customRange1" class="form-label">Defina seu limite de Crédito</label>
      <input type="range" class="form" min="0" max="10000" value="${limitCredit ?? 0}" step="50" required />
    </div>
  </div>
</div>
  `;
  }
}
