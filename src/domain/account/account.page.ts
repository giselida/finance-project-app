import Swal from "sweetalert2";
import warningImage from "../../assets/release_alert.png";
import { RouterOutlet } from "../../components/router-outlet/router-outlet";
import { Toasts } from "../../components/toasts/toast";
import { badgeUpdate } from "../../functions/notification/notification";
import { generatePropertyBind } from "../../functions/property-bind";
import { Cliente } from "../auth/interface/client.interface";
import { CardClient } from "./../card-account/interface/card-client";
import html from "./account.page.html?raw";
import "./account.page.scss";
export class AccountPage extends HTMLElement {
  $buttonAdd: HTMLButtonElement;
  clientList: Cliente[];
  clientSelected: Cliente;
  clientCard: CardClient;
  $previous: HTMLButtonElement;
  $next: HTMLButtonElement;
  $pageActually: HTMLElement;
  page: number = 1;
  pageSize: number = 5;
  constructor() {
    super();
    this.getStorage();
  }

  private getStorage() {
    this.clientList = JSON.parse(localStorage.getItem("clients") ?? "[]");
    this.clientCard = JSON.parse(localStorage.getItem("cardClient") ?? "{}");
    this.clientSelected = JSON.parse(localStorage.getItem("client") ?? "{}");
  }

  get $currentUser() {
    return document.querySelector(".current-user");
  }

  get maxPage(): number {
    return Math.ceil(this.clientList.length / this.pageSize);
  }

  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
    if (this.clientList.length < 1) window.location.replace("#register");
  }
  private createInnerHTML() {
    generatePropertyBind.bind(this, html)();
  }

  recoveryElementRef() {
    this.$buttonAdd = document.querySelector(".btn-add");

    this.$previous = document.querySelector(".page-previous");
    this.$next = document.querySelector(".page-next");
    this.$pageActually = document.querySelector(".page-actually");

    this.addListeners();
    this.renderList();
  }

  private addListeners() {
    this.$next.addEventListener("click", () => this.nextPage());
    this.$previous.addEventListener("click", () => this.previousPage());
  }

  private setStorage() {
    localStorage.setItem("clients", JSON.stringify(this.clientList));
    localStorage.setItem("client", JSON.stringify(this.clientSelected));
  }

  renderList() {
    const $tbody = document.querySelector("tbody");
    const $table = document.querySelector("table");
    const clientLength = this.clientList.length < 1;
    const $card = document.querySelector<HTMLElement>(".card");
    const $title = document.querySelector<HTMLElement>(".content-row");
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");
    this.$previous.disabled = this.page == 1;
    this.$next.disabled = this.maxPage <= this.page;
    const $pagination = document.querySelector<HTMLElement>(".container-pagination");

    $pagination.hidden = clientLength;

    const actuallyPage = (this.page - 1) * this.pageSize;
    const nextPage = actuallyPage + this.pageSize;
    $card.style.display = !this.clientSelected.id ? "none" : "block";
    $title.style.display = !this.clientSelected.id ? "none" : "block";
    $accountInfo.style.display = !this.clientSelected.id ? "block" : "none";
    $table.hidden = clientLength;
    $tbody.innerHTML = "";
    this.$pageActually.textContent = this.page.toString();
    this.clientList.slice(actuallyPage, nextPage).forEach((client) => {
      $tbody.innerHTML += `
     
       <tr>
  <th scope="row">${client.id}</th>
  <td>${client.accountNumber}</td>
  <td>${client.name}</td>
  <td class="actions">
    ${
      this.clientSelected?.id != client.id && client.id !== 1000
        ? `
    <span class="material-symbols-outlined add-account" onclick="document.querySelector('account-page').selectClient(${client.id})">
      fact_check
    </span>
    `
        : ""
    }
    ${
      client.id !== 1000
        ? `
    <span class="material-icons-outlined delete" onclick="document.querySelector('account-page').removeClient(${client.id})">
      delete
    </span>
    `
        : ""
    }
 
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
        if (this.clientSelected.id === client.id) {
          this.$currentUser.innerHTML = "";
        }
        this.clientList = this.clientList.filter((client) => client.id !== id);

        this.clientSelected = this.clientSelected.id == id ? ({} as Cliente) : this.clientSelected;
        this.setStorage();
        Toasts.success("Conta removida com sucesso!");
        if (this.clientSelected.id == id) {
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

    this.clientSelected = client;
    this.$currentUser.innerHTML = client.name;
    client.selected = true;
    if (this.clientList.length <= 1) {
      if (client.accountAmount == 0) client.accountAmount = 10000;
    }
    const list = this.clientList.filter((item) => item !== client);
    list.forEach((value) => {
      value.selected = false;
    });

    Toasts.success(`Conta ${client.name} número ${client.accountNumber} foi selecionada com sucesso!`);
    this.setStorage();

    this.connectedCallback();
    badgeUpdate();
  }
}
