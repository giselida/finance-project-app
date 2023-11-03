import "./account.page.scss";
export class AccountPage extends HTMLElement {
  connectedCallback() {
    const client = JSON.parse(localStorage.getItem("client") ?? "{}");

    this.innerHTML = /*html*/ `
    <div class="card mb-2" >
  <div class="card-header">
    Conta selecionada
  </div>
  <div class="card-body">
    <h5 class="card-title">Nome: ${client.name ?? ""}</h5>
    <h5 class="card-title">Numero da conta: ${client.accountNumber ?? ""}</h5>
    <p class="card-text">Saldo: R$ ${(client.accountAmount ?? 0).toFixed(2)}</p>
  </div>

</div>`;
  }
}
