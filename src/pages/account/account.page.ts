import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import { RouterOutlet } from "../../components/router-outlet/router-outlet";
import { Toasts } from "../../components/toasts/toast";
import { badgeUpdate } from "../../functions/notification";
import "./account.page.scss";
export interface Cliente {
  id: number;
  name: string;
  email: string;
  accountNumber: string;
  accountAmount: number;
  password: string;
  limitCredit: number;
}

export class AccountPage extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputEmail: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  $inputRange: HTMLInputElement;
  $creditValue: HTMLElement;
  clientList: Cliente[];
  client: Cliente;
  $modal: HTMLElement;
  constructor() {
    super();
    this.getStorage();
  }

  private getStorage() {
    this.clientList = JSON.parse(localStorage.getItem("clients") ?? "[]");
    this.client = JSON.parse(localStorage.getItem("client") ?? "{}");
  }

  get $currentUser() {
    return document.querySelector(".current-user");
  }
  maxID: number = 0;

  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
  }
  private createInnerHTML() {
    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const { name, accountNumber, accountAmount, limitCredit } = this.client;
    this.innerHTML = /*html*/ `
<span class="account-info">
  Você não possui uma conta selecionada!
</span>
<div class="card mb-2">
  <div class="card-header">Conta selecionada</div>
  <div class="card-body">
    <div class="card-title"><span class="info">Nome:</span> ${name ?? ""} </div>
    <div class="card-title"><span class="info">Numero da conta:</span> ${accountNumber ?? ""}</div>
    <div class="card-title"><span class="info">Saldo:</span> ${currencyFormatter.format(accountAmount ?? 0)}</div>
    <div class="line"></div>
    <div class="limit-credit">
      <label for="customRange1" class="form-label">Defina seu limite de Crédito</label>
      <div class="credit-value">
        <span class="info">Limite de crédito:</span>
        <span class="limit-credit-value"> 
         ${currencyFormatter.format(limitCredit ?? 0)}
        </span>
      </div>
      <input type="range" class="form" min="0" max="10000" value="${limitCredit ?? 0}" step="50" required />
    </div>
  </div>
</div>
<div class="content-row">
  <h1 class="title">Contas cadastradas</h1>
  <button type="button" class="btn btn-account" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
   <span class="material-symbols-outlined">
group_add
</span>
    Criar uma conta
  </button>
</div>
<div
  class="modal fade"
  id="staticBackdrop"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-2" id="staticBackdropLabel">Criar uma nova conta</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="was-validated">
          <div class="mb-3">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control form" required />
            <div class="invalid-feedback">Campo obrigatório!</div>
          </div>
          <div class="mb-3">
            <label class="form-label">E-mail</label>
            <input type="text" class="form-control form" required />
            <div class="invalid-feedback">E-mail obrigatório!</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control form" required />
            <div class="invalid-feedback">Digite uma senha!</div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-add" type="submit">Cadastrar</button>
        <button type="button" class="btn btn-closed" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
<div class="table-container">
  <table class="table table-hover table-bordered">
    <thead class="table-warning">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Numero da conta</th>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>
`;
  }

  recoveryElementRef() {
    this.$modal = document.querySelector("#staticBackdrop");
    this.maxID = +localStorage.getItem("idClients");
    this.$buttonAdd = document.querySelector(".btn-add");

    const $formControls = document.querySelectorAll("form .form");
    const [$inputName, $inputEmail, $inputPassword] = $formControls;
    this.$inputName = $inputName as HTMLInputElement;
    this.$inputEmail = $inputEmail as HTMLInputElement;
    this.$inputPassword = $inputPassword as HTMLInputElement;
    this.$creditValue = document.querySelector(".limit-credit-value");
    this.$inputRange = document.querySelector("input[type='range']");

    this.addListeners();
    this.renderList();
  }

  private addListeners() {
    this.sendListener();
    this.rangeListener();
    this.setRangeColor();
  }
  private rangeListener() {
    this.$inputRange.addEventListener("input", () => {
      const formRangeValue = +this.$inputRange.value;
      this.$creditValue.textContent = `${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(formRangeValue)}`;
      const client = this.clientList.find((client) => client.id == this.client.id);
      client.limitCredit = formRangeValue;
      this.client = client;
      this.setRangeColor();
      this.setStorage();
    });
  }
  private setRangeColor() {
    const { value, max } = this.$inputRange;
    const progress = (+value / +max) * 100;

    this.$inputRange.style.setProperty(
      "--input-range-color",
      `linear-gradient(to right, #FE5E71 0%, #FE5E71 ${progress}%, #FCD3E4 ${progress}%, #FCD3E4 100%)`
    );
  }
  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.$inputName.value || !this.$inputEmail.value || !this.$inputPassword.value) return;
      this.addClient();
      this.renderList();
      this.instanceModal().toggle();
    });
  }
  private instanceModal() {
    return Modal.getOrCreateInstance(this.$modal);
  }
  private setStorage() {
    localStorage.setItem("clients", JSON.stringify(this.clientList));
    localStorage.setItem("client", JSON.stringify(this.client));
    localStorage.setItem("idClients", this.maxID.toString());
  }

  renderList() {
    const $tbody = document.querySelector("tbody");
    const $table = document.querySelector("table");
    const clientLength = this.clientList.length < 1;
    const $card = document.querySelector<HTMLElement>(".card");
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");

    $card.style.display = !this.client.id ? "none" : "block";
    $accountInfo.style.display = !this.client.id ? "block" : "none";
    $table.hidden = clientLength;
    $tbody.innerHTML = "";
    this.clientList.forEach((client) => {
      $tbody.innerHTML += `
       <tr>
       <th scope="row">${client.id}</th>
      <td>${client.accountNumber}</td>
      <td>${client.name}</td>
      <td>${client.email}</td> 
      <td class="actions"> 
      ${
        this.client?.id != client.id
          ? `   <ion-icon name="bag-check-outline" class="add-account" onclick="document.querySelector('configuration-page').selectClient(${client.id})">
      </ion-icon>`
          : ""
      }
      <ion-icon name="trash-outline" class="delete" onclick="document.querySelector('configuration-page').removeClient(${client.id})" >
      </ion-icon>
    
      </td> 
    </tr>
      `;
    });
  }
  removeClient(id: number) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá desfazer esta alteração!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, quero deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientList = this.clientList.filter((client) => client.id !== id);
        this.client = this.client.id == id ? ({} as Cliente) : this.client;
        this.setStorage();
        Toasts.success("Conta removida com sucesso!");
        if (this.client.id == id) {
          const router = document.querySelector<RouterOutlet>("router-app");
          if (!router) return;
          router["createInnerHTML"]();
          router["renderOutlet"]();
          router["onInit"]();
        }
        this.renderList();
        this.connectedCallback();
      }
    });
  }
  selectClient(id: number) {
    const client = this.clientList.find((client) => client.id == id);
    if (client && !this.client?.id) {
      if (client.accountAmount == 0) client.accountAmount = 100;
    }
    this.client = client;
    this.$currentUser.innerHTML = client.name;

    console.log(this.client?.id, client);

    Toasts.success(`Conta ${client.name} número ${client.accountNumber} foi selecionada com sucesso!`);
    badgeUpdate();
    this.setStorage();
    this.getStorage();
    this.connectedCallback();
  }

  cleanForms() {
    this.$inputName.value = "";
    this.$inputEmail.value = "";
    this.$inputPassword.value = "";
    localStorage.removeItem("client");
  }

  private addClient() {
    const random = (min: number = 1, max: number = 100) => Math.floor(Math.random() * (max - min) + min);
    const objectClient: Cliente = {
      id: ++this.maxID,
      name: this.$inputName.value,
      email: this.$inputEmail.value,
      accountNumber: `${random()}${random()}${random()}-${random()}`,
      accountAmount: 0,
      password: this.$inputPassword.value,
      limitCredit: 0,
    };
    this.clientList.push(objectClient);
    this.setStorage();
    this.cleanForms();
    Toasts.success("Conta criada com sucesso!");
  }
}
