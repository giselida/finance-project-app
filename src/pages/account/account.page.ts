import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import warningImage from "../../assets/release_alert.png";
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
  limitCreditUsed: number;
  limitCreditCurrent: number;
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
  $previous: HTMLButtonElement;
  $next: HTMLButtonElement;
  $pageActually: HTMLElement;
  page: number = 1;
  pageSize: number = 5;
  $usedCreditValue: HTMLElement;
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
  get maxPage(): number {
    return Math.ceil(this.clientList.length / this.pageSize);
  }
  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
  }
  private createInnerHTML() {
    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const { name, accountNumber, accountAmount, limitCredit, limitCreditCurrent } = this.client;

    this.innerHTML = /*html*/ `
<span class="account-info">
  Você não possui uma conta selecionada!
</span>
<div class="card">
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
        <span class="info">Limite de crédito disponível:</span>
        <span class="available-credit-value"> 
         ${currencyFormatter.format(limitCreditCurrent ?? 0)}
        </span>
      </div>
      <div class="range">
        <input type="range" class="form" min="0" max="10000" value="${limitCredit ?? 0}" step="50" required />
      </div>
    </div>
  </div>
</div>
<div class="content-row">
  <h1 class="title">Contas cadastradas</h1>
  <button type="button" class="btn btn-account" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
   <span class="material-symbols-outlined icon">
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
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title" id="staticBackdropLabel">Criar uma nova conta</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="was-validated">
          <div class="mb-3">
            <label class="form-label">Nome <div class="required">*</div></label>
            <input type="text" class="form-control form" placeholder="Digite o nome do usuário" required />
          </div>
          <div class="mb-3">
            <label class="form-label">E-mail<div class="required">*</div></label>
            <input type="text" class="form-control form" placeholder="Digite o email do usuário" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Senha<div class="required">*</div></label>
            <input type="password" class="form-control form" placeholder="Digite a senha do usuário" autocomplete="off" required />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-closed" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn btn-add" type="submit">Cadastrar</button>
      </div>
    </div>
  </div>
</div>
<div class="table-container">
  <table class="table table-hover ">
    <thead>
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
<nav class="container-pagination" aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item">
          <button class="page-link page-previous" aria-label="Previous" disabled>
            <span class="previous">&laquo;</span>
          </button>
        </li>
        <li class="page-item">
          <div class="page-link page-actually">1</div>
        </li>
        <li class="page-item">
          <button class="page-link page-next" aria-label="Next" disabled>
            <span class="next">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
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
    this.$usedCreditValue = document.querySelector(".available-credit-value");
    this.$inputRange = document.querySelector("input[type='range']");
    this.$previous = document.querySelector(".page-previous");
    this.$next = document.querySelector(".page-next");
    this.$pageActually = document.querySelector(".page-actually");
    this.addListeners();
    this.renderList();
  }

  private addListeners() {
    this.$next.addEventListener("click", () => this.nextPage());
    this.$previous.addEventListener("click", () => this.previousPage());
    this.sendListener();
    this.rangeListener();
    this.setRangeColor();
  }
  private rangeListener() {
    this.$inputRange.addEventListener("input", () => {
      const formRangeValue = +this.$inputRange.value;
      const limitCredit = +this.$inputRange.value - this.client.limitCreditUsed;
      this.$creditValue.textContent = `${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(formRangeValue)}`;
      this.$usedCreditValue.textContent = `${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(limitCredit)}`;
      const client = this.clientList.find((client) => client.id == this.client.id);
      client.limitCredit = formRangeValue;
      client.limitCreditCurrent = limitCredit;

      this.client = client;
      this.setRangeColor();
      this.setStorage();
    });
  }
  private setRangeColor() {
    const { value, max } = this.$inputRange;
    const $range = document.querySelector<HTMLDivElement>(".range");
    const progress = (+value / +max) * 100;
    const barColor = "#FCD3E4";
    const primaryColor = "#FE5E71";
    const secondaryColor = "#bd3647";
    const secondaryBarColor = "#d5374a42";
    const limitProgress = (+value / +this.client.limitCreditUsed) * 100;

    $range.style.setProperty("--width", `${this.client.limitCreditUsed / 100}%`);

    $range.style.setProperty(
      "--input-range-color",
      `linear-gradient(to right, ${primaryColor} ${progress}%, ${primaryColor} ${progress}%, ${barColor} ${progress}%, ${barColor} 100%)`
    );

    $range.style.setProperty(
      "--limit-range-color",
      `linear-gradient(to right, ${secondaryColor} ${limitProgress}%, ${secondaryColor} ${limitProgress}%, ${secondaryBarColor} ${progress}%, ${secondaryBarColor} 100%)`
    );
  }

  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.$inputName.value || !this.$inputEmail.value || !this.$inputPassword.value) {
        Toasts.error("Por favor preencha os campos obrigatórios!");
        throw new Error("Por favor preencha os campos obrigatórios!");
      }
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
    this.$previous.disabled = this.page == 1;
    this.$next.disabled = this.maxPage <= this.page;
    const $pagination = document.querySelector<HTMLElement>(".container-pagination");

    $pagination.hidden = this.clientList.length < 1;

    const actuallyPage = (this.page - 1) * this.pageSize;
    const nextPage = actuallyPage + this.pageSize;

    $card.style.display = !this.client.id ? "none" : "block";
    $accountInfo.style.display = !this.client.id ? "block" : "none";
    $table.hidden = clientLength;
    $tbody.innerHTML = "";
    this.$pageActually.textContent = this.page.toString();
    this.clientList.slice(actuallyPage, nextPage).forEach((client) => {
      $tbody.innerHTML += `
       <tr>
  <th scope="row">${client.id}</th>
  <td>${client.accountNumber}</td>
  <td>${client.name}</td>
  <td>${client.email}</td>
  <td class="actions">
    ${
      this.client?.id != client.id
        ? `
    <span class="material-symbols-outlined add-account" onclick="document.querySelector('account-page').selectClient(${client.id})">
      fact_check
    </span>
    `
        : ""
    }
    <span class="material-icons-outlined delete" onclick="document.querySelector('account-page').removeClient(${client.id})">
      delete
    </span>
  </td>
</tr>
      `;
    });
  }
  private previousPage() {
    this.page--;

    if (this.page <= 1) {
      this.page = 1;
    }
    this.renderList();
  }
  private nextPage() {
    this.page++;

    if (this.page > this.maxPage) {
      this.page = this.maxPage;
    }
    this.renderList();
  }
  removeClient(id: number) {
    Swal.fire({
      title: `
      <img src="${warningImage}" />
      Você tem certeza?
      `,
      html: "Esta é uma <b>ação irreversível</b> <br>será aplicada imediatamente",
      showCancelButton: true,
      confirmButtonColor: "#ffff",
      cancelButtonColor: "#fe5e71",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
    }).then((result) => {
      const client = this.clientList.find((client) => client.id == id);
      if (result.isConfirmed) {
        if (this.client.name === client.name) {
          this.$currentUser.innerHTML = "";
        }
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
      if (client.accountAmount == 0) client.accountAmount = 10000;
    }
    this.client = client;
    this.$currentUser.innerHTML = client.name;

    Toasts.success(`Conta ${client.name} número ${client.accountNumber} foi selecionada com sucesso!`);
    this.setStorage();
    this.getStorage();
    this.connectedCallback();
    badgeUpdate();
  }

  cleanForms() {
    this.$inputName.value = "";
    this.$inputEmail.value = "";
    this.$inputPassword.value = "";
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
      limitCreditUsed: 0,
      limitCreditCurrent: 0,
    };
    this.clientList.push(objectClient);
    this.setStorage();
    this.cleanForms();
    Toasts.success("Conta criada com sucesso!");
  }
}
