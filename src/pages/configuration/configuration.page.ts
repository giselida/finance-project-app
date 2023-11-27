import Swal from "sweetalert2";
import { RouterOutlet } from "../../components/router-outlet/router-outlet";
import { Toasts } from "../../components/toasts/toast";
import { badgeUpdate } from "../../functions/notification";
import "./configuration.page.scss";
export interface Cliente {
  id: number;
  name: string;
  email: string;
  accountNumber: string;
  accountAmount: number;
  password: string;
  limitCredit: number;
}

export class ConfigurationPage extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputEmail: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  clientList: Cliente[];
  get client(): Cliente {
    return JSON.parse(localStorage.getItem("client") ?? "{}");
  }
  maxID: number = 0;

  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
  }
  private createInnerHTML() {
    this.innerHTML = /*html*/ `

<div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      Cadastrar uma conta
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <form class="was-validated">
        <div class="mb-3">
          <label class="form-label">Nome</label>
          <input type="text" class="form-control form" required>
          <div class="invalid-feedback">
     Campo obrigatório!
    </div>
        </div>
        <div class="mb-3">
          <label  class="form-label">E-mail</label>
          <input type="text" class="form-control form" required >
          <div class="invalid-feedback">
     E-mail obrigatório!
    </div>
        </div>
        <div class="mb-3">
          <label  class="form-label">Senha</label>
      <input type="password" class="form-control form" required>
      <div class="invalid-feedback">
     Digite uma senha!
    </div>
        </div>
       
        <div class="mb-3">
          <button class="btn btn-add" type="submit">Salvar</button>
        </div>
      </form>

    </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      Visualizar contas
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
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
  <tbody>
  </tbody>
</table>
      </div>

<span class="account-info">
  Você não possui nenhuma conta.
</span>
      </div>
    </div>
  </div>
</div>
`;
  }

  recoveryElementRef() {
    this.clientList = JSON.parse(localStorage.getItem("clients")) ?? [];
    this.maxID = +localStorage.getItem("idClients");
    this.$buttonAdd = document.querySelector(".btn-add");

    const $formControls = document.querySelectorAll(".form");
    const [$inputName, $inputEmail, $inputPassword] = $formControls;
    this.$inputName = $inputName as HTMLInputElement;
    this.$inputEmail = $inputEmail as HTMLInputElement;
    this.$inputPassword = $inputPassword as HTMLInputElement;
    this.addListeners();
    this.renderList();
  }

  private addListeners() {
    this.sendListener();
  }

  get $currentUser() {
    return document.querySelector(".current-user");
  }
  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.$inputName.value || !this.$inputEmail.value || !this.$inputPassword.value) return;
      this.addClient();
      this.renderList();
    });
  }
  private setStorage() {
    localStorage.setItem("clients", JSON.stringify(this.clientList));
    localStorage.setItem("idClients", this.maxID.toString());
  }
  renderList() {
    const $tbody = document.querySelector("tbody");
    const $table = document.querySelector("table");
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");
    const clientLength = this.clientList.length < 1;

    $accountInfo.hidden = !clientLength;
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
        this.setStorage();
        this.renderList();
        if (this.client.id == id) {
          localStorage.removeItem("client");
          const router = document.querySelector<RouterOutlet>("router-app");
          if (!router) return;
          router["createInnerHTML"]();
          router["renderOutlet"]();
          router["onInit"]();
          this.firstClient();
        }
        Toasts.success("Conta removida com sucesso!");
      }
    });
  }
  selectClient(id: number) {
    const client = this.clientList.find((client) => client.id == id);
    this.$currentUser.innerHTML = client.name;
    localStorage.setItem("client", JSON.stringify(client));
    this.connectedCallback();
    Toasts.success(`Conta ${client.name} número ${client.accountNumber} foi selecionada com sucesso!`);
    badgeUpdate();
  }
  private firstClient() {
    const client = this.clientList[0];

    if (client) {
      if (client.accountAmount == 0) client.accountAmount = 100;
      this.setStorage();
      this.$currentUser.innerHTML = client.name;
      localStorage.setItem("client", JSON.stringify(client));
    }
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
    this.firstClient();
    Toasts.success("Conta criada com sucesso!");
  }
}
