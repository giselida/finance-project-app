import { Cliente } from "../home/home.page";
import "./account.page.scss";
export class AccountPage extends HTMLElement {
  clientList: Cliente[];
  $inputRange: HTMLInputElement;
  $creditValue: HTMLElement;

  get clientLogged() {
    return JSON.parse(localStorage.getItem("client") ?? "{}");
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
    this.$inputRange = document.querySelector(".form-range");

    if (!this.clientLogged.id) {
      $card.style.display = "none";
      $accountInfo.style.display = "block";
    }
  }

  private addListeners() {
    this.rangeListener();
  }

  private rangeListener() {
    const clients: Cliente[] = JSON.parse(localStorage.getItem("clients") ?? "[]");

    const clientLogged = clients.find((client) => client.id === this.clientLogged.id);
    this.$inputRange.addEventListener(
      "input",
      this.debounceEvent(() => {
        const formRangeValue = +this.$inputRange.value;
        this.$creditValue.textContent = `Limite de crédito: ${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(formRangeValue)}`;
        clientLogged.limitCredit = formRangeValue;
        localStorage.setItem("client", JSON.stringify(clientLogged));
        localStorage.setItem("clients", JSON.stringify(clients));
      }, 500)
    );
  }
  debounceEvent(callback: any, timeout: number) {
    let timer: any;

    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
      }, timeout);
    };
  }
  private createInnerHtml() {
    this.innerHTML = /*html*/ `
    <span class="account-info">Você não possui uma conta cadastrada,
      <a href="#home">cadastrar uma conta</a>
  </span>
    <div class="card mb-2" >
  <div class="card-header">
    Conta selecionada
  </div>
  <div class="card-body">
    <div class="card-title">Nome: ${this.clientLogged.name ?? ""}</div>
    <div class="card-title">Numero da conta: ${this.clientLogged.accountNumber ?? ""}</div>
    <div class="card-title">Saldo: ${new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.clientLogged.accountAmount ?? 0)}</div>
    <div class="credit-value">Limite de crédito: ${new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.clientLogged.limitCredit ?? 0)}</div>
    <div class="mt-3">
         <label for="customRange1" class="form-label">Defina seu limite de Crédito</label>
<input type="range" class="form form-range" min="0" max="10000" value="${this.clientLogged.limitCredit}" step="50" required>
</div>
  </div>

</div>`;
  }
}
