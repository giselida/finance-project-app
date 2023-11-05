import { Cliente } from "../home/home.page";
import "./account.page.scss";
export class AccountPage extends HTMLElement {
  client: Cliente;
  connectedCallback() {
    this.client = JSON.parse(localStorage.getItem("client") ?? "{}");
    console.log(this.client);

    this.innerHTML = /*html*/ `
    <span class="account-info">
  Você não possui nenhuma conta,<a href="#home">Cadastrar conta</a>
</span>
    <div class="card mb-2" >
  <div class="card-header">
    Conta selecionada
  </div>
  <div class="card-body">
    <h5 class="card-title">Nome: ${this.client.name ?? ""}</h5>
    <h5 class="card-title">Numero da conta: ${this.client.accountNumber ?? ""}</h5>
    <p class="card-text">Saldo: R$ ${(this.client.accountAmount ?? 0).toFixed(2)}</p>
  </div>

</div>`;
    const $card = document.querySelector<HTMLElement>(".card");
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");

    if (!this.client.id) {
      $card.style.display = "none";
      $accountInfo.style.display = "block";
    }
  }
}
