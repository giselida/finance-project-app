import Currency from "@tadashi/currency";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import ApexCharts from "apexcharts";
import { Modal } from "bootstrap";
import IMask from "imask";
import Swal from "sweetalert2";

import warningImage from "../../assets/release_alert.png";
import { FormSelect } from "../../components/form-select/form-select";
import { Toasts } from "../../components/toasts/toast";
import { OPTIONS_PAYMENT } from "../../constants/charts";
import { PT_BR_LOCALE } from "../../constants/date-picker-locale";
import { eFormOfPayment, SVG_ICONS } from "../../constants/svg-icons";
import { convertStringDate } from "../../functions/date/date";
import { badgeUpdate } from "../../functions/notification/notification";

import { Cliente } from "../auth/interface/client.interface";
import { CardClient } from "../card-account/interface/card-client";
import { Transaction } from "./interface/transaction.interface";
import "./transaction.page.scss";

export const formOfPaymentOptions = [
  {
    id: eFormOfPayment.CREDITO,
    name: "Crédito",
  },
  {
    id: eFormOfPayment.DEBITO,
    name: "Debito",
  },
  {
    id: eFormOfPayment.DINHEIRO,
    name: "Dinheiro",
  },
  {
    id: eFormOfPayment.PIX,
    name: "Pix",
  },
];

export class TransactionPage extends HTMLElement {
  mask: typeof Currency;
  $inputFormOfPayment: FormSelect;
  $btnSend: HTMLButtonElement;
  $inputValue: HTMLInputElement;
  $inputDate: HTMLInputElement;
  $clientID: HTMLInputElement;
  $search: HTMLInputElement;
  $edit: HTMLSpanElement;
  $delete: HTMLSpanElement;
  $modal: HTMLElement;
  $order: HTMLElement;
  selectedId: number;
  actuallyId: number = +localStorage.getItem("actuallyId");
  $previous: HTMLButtonElement;
  $next: HTMLButtonElement;
  $pageActually: HTMLElement;
  page: number = 1;
  pageSize: number = 5;
  transactionList: Transaction[];
  transactionFind: Transaction;
  datePicker: AirDatepicker;
  $tableHeaders: NodeListOf<HTMLTableCellElement>;
  $chart: ApexCharts;
  originalList: Transaction[];
  cardClient: CardClient;

  get numberFormat() {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat("pt-BR", options);
  }

  get clients(): Cliente[] {
    return JSON.parse(localStorage.getItem("clients") ?? "[]");
  }
  get clientLogged(): Cliente {
    return JSON.parse(localStorage.getItem("client") || "{}");
  }

  get listOfCards(): CardClient[] {
    return JSON.parse(localStorage.getItem("listOfCards") || "[]");
  }
  get filteredList() {
    return this.transactionList.filter((item) => {
      const isSameID = +item.userLoggedID === +this.clientLogged.id;
      return (
        +isSameID &&
        Object.values(item).some((item) => {
          if (typeof item === "number") return item.toString().replace(".", ",").includes(this.$search.value.toLowerCase());
          return item.toString().toLowerCase().includes(this.$search.value.toLowerCase());
        })
      );
    });
  }
  get maxPage(): number {
    this.displayBadgeNotifications();
    return Math.ceil(this.filteredList.length / this.pageSize);
  }
  createInnerHTML() {
    this.innerHTML = /*html*/ `

    <div class="container-current-balance">
      <div class="item">
        Saldo: <span class="current-balance">0,00</span>
      </div>
      <div class="item">
        Limite de Crédito: <span class="current-limit">0,00</span>
      </div>
    </div>
    <div id="chart-payment"></div>
    <div class="content-row mb-3">
      <button type="button" class="btn btn-transaction" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <span class="material-symbols-outlined icon"> sync_alt</span>
        Fazer uma transação
      </button>
      <div class="group-input">
        <div class="input-group-text">
          <span class="material-symbols-outlined"> search </span>
        </div>
        <input type="text" class="form-search" placeholder="Pesquisar" />
      </div>
    </div>

    <div
      class="modal fade "
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-2" id="staticBackdropLabel">Transação</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="was-validated">
              <div class="form-input">
                <label class="form-label">Valor<div class="required">*</div></label>
                <input
                  type="text"
                  class="form-control"
                  autocomplete="transaction-currency"
                  pattern="[0-9]+,[0-9]{2}||[0-9]+(.[0-9]{3})*,[0-9]{2}"
                  required
                />  
              </div>
              <div class="form-input description">
                <label class="form-label">Forma de pagamento<div class="required">*</div></label>
              </div>
              <div class="form-input">
                <label class="form-label">Data<div class="required">*</div></label>
                <input type="text" pattern="^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$" class="form-control icon-calendar" required />
              </div>
              <div class="form-input client">
                <label class="form-label">Cliente<div class="required">*</div></label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-closed" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-add">Cadastrar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="table table-hover ">
        <thead>
          <tr style="position: sticky; top: 0">
            <th scope="col" key="id">
              <div class="row-header">
                <span>#</span>
                <div class="sort"></div>
              </div>
            </th>
            <th scope="col" key="value">
              <div class="row-header">
                <span>Valor</span>
                <div class="sort"></div>
              </div>
            </th>
            <th scope="col" key="formOfPayment">
              <div class="row-header">
                <span>Forma de pagamento</span>
                <div class="sort"></div>
              </div>
            </th>
            <th scope="col" key="date">
              <div class="row-header">
                <span>Data</span>
                <div class="sort"></div>
              </div>
            </th>
            <th scope="col" key="dateOfPayDay">
              <div class="row-header">
                <span>Data do pagamento</span>
                <div class="sort"></div>
              </div>
            </th>
            <th scope="col" key="name">
              <div class="row-header">
                <span>Nome</span>
                <div class="sort"></div>
              </div>
            </th>
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
    const $description = this.querySelector(".description");
    $description.innerHTML += this.createFormSelect();

    const $client = this.querySelector(".client");
    $client.innerHTML += this.createFormSelectCliente();
  }
  renderTransactions(transactions: Transaction[] = this.filteredList) {
    this.validPayment();

    this.$previous.disabled = this.page == 1;
    this.$next.disabled = this.maxPage <= this.page;

    const $tbody = document.querySelector("tbody");
    const $table = document.querySelector("table");
    $table.hidden = this.filteredList.length < 1;
    const $pagination = document.querySelector<HTMLElement>(".container-pagination");

    $pagination.hidden = this.filteredList.length < 1;

    const actuallyPage = (this.page - 1) * this.pageSize;
    const nextPage = actuallyPage + this.pageSize;
    $tbody.innerHTML = "";
    this.$pageActually.textContent = this.page.toString();
    window.history.replaceState({}, "", `?page=${this.page}#transaction`);
    transactions.slice(actuallyPage, nextPage).forEach((transaction) => {
      const dateOfPayDay = transaction?.dateOfPayDay
        ? new Date(transaction?.dateOfPayDay).toLocaleDateString("pt-BR", {
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }) ?? "-"
        : "-";
      const formOfPayment = formOfPaymentOptions.find((item) => item.id === transaction.idFormOfPayment).name;

      $tbody.innerHTML += /*html*/ ` 
       <tr id="option-of-transaction-${transaction.id}">
         <td scope="row">${transaction.id}</td>
         <td>${this.numberFormat.format(transaction.value)}</td>
         <td>
           ${SVG_ICONS[transaction.idFormOfPayment]}  
           ${formOfPayment}
      </td>
      <td>${transaction.date}</td>
      <td>${dateOfPayDay}</td>
      <td>${transaction.clientName}</td>
      <td>
        
       
        <span class="material-icons-outlined edit ${this.hiddenElement(
          !!transaction.dateOfPayDay
        )}"onclick="document.querySelector('transaction-page').editTransaction(${transaction.id})">
edit
</span>
<span class="material-icons-outlined duplicate" onclick="document.querySelector('transaction-page').duplicateTransaction(${
        transaction.id
      })">
content_copy
</span>
         <span class="material-icons-outlined delete ${this.hiddenElement(
           !!transaction.dateOfPayDay
         )}" onclick="document.querySelector('transaction-page').removeTransaction(${transaction.id})">
          delete
         </span>
       
        
      </td>
    </tr>`;
    });
  }
  private applySort() {
    const $sorts = document.querySelectorAll(".sort");
    $sorts.forEach((element) => {
      if (element.innerHTML == "") return;
      const $th = element.parentElement.parentElement;
      const direction = element.innerHTML.includes("arrow_upward") ? "asc" : "desc";
      this.sortByDirectionAndKey(direction, $th.getAttribute("key"));
    });
  }

  connectedCallback() {
    this.cardClient = JSON.parse(localStorage.getItem("cardClient") || "{}");
    this.createInnerHTML();
    this.setElementRef();
    this.displayClientAmount();
    this.setEventListeners();
    this.renderTransactions();
    this.renderChart();
  }
  disconnectedCallback() {
    window.history.replaceState({}, "", `?${window.location.hash}`);
    this.$chart.destroy();
  }

  setElementRef() {
    if (!this.clientLogged?.id) {
      localStorage.removeItem("transactionList");
    }

    this.originalList = JSON.parse(localStorage.getItem("transactionList")) ?? [];
    this.transactionList = this.originalList.filter((item: Transaction) => item.userLoggedID === this.clientLogged?.id);
    this.page = +(location.search?.replace("?page=", "") || 1);

    const [$formInputValue, $formInputFormOfPayment, $formInputDate, $formInputName] = document.querySelectorAll(".form-control");
    this.$inputValue = $formInputValue as HTMLInputElement;
    this.$inputFormOfPayment = $formInputFormOfPayment as FormSelect;
    this.$inputDate = $formInputDate as HTMLInputElement;
    this.$clientID = $formInputName as HTMLInputElement;
    this.$modal = document.querySelector("#staticBackdrop");
    this.$tableHeaders = document.querySelectorAll("th");
    this.$btnSend = document.querySelector(".btn-add");
    this.$edit = document.querySelector(".edit");
    this.$delete = document.querySelector(".delete");
    this.$search = document.querySelector(".form-search");
    this.$previous = document.querySelector(".page-previous");
    this.$next = document.querySelector(".page-next");
    this.$pageActually = document.querySelector(".page-actually");
  }
  setEventListeners() {
    const self = this;
    this.mask = Currency.data(this.$inputValue) || new Currency(this.$inputValue);

    this.$btnSend.addEventListener("click", () => this.sendListener());
    this.$modal.addEventListener("hidden.bs.modal", () => this.onModalHidden());

    this.$search.addEventListener(
      "input",
      this.debounceEvent(() => {
        this.page = 1;
        this.renderTransactions();
      }, 500)
    );
    this.$tableHeaders.forEach(($th) => $th.addEventListener("click", () => this.sortByColumn($th)));

    this.$next.addEventListener("click", () => this.nextPage());
    this.$previous.addEventListener("click", () => this.previousPage());

    this.datePicker = new AirDatepicker(this.$inputDate, {
      locale: PT_BR_LOCALE,

      onRenderCell({ date }) {
        const isDisabled = self.validateDateIsFuture(date);
        return {
          disabled: isDisabled,
        };
      },
    });
    IMask(this.$inputDate, {
      mask: "00/00/0000",
      validate(value, masked) {
        if (value.length === 10) {
          const isDisabled = self.validateDateIsFuture(convertStringDate(value));
          if (isDisabled) masked.reset();
          return !isDisabled;
        }
      },
    });
  }

  debounceEvent(callback: () => void, timeout: number) {
    let timer: NodeJS.Timeout;

    return () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        callback();
      }, timeout);
    };
  }

  renderChart() {
    const dates = this.transactionList.map((value) => value.date);
    dates.sort((a, b) => convertStringDate(a).getTime() - convertStringDate(b).getTime());
    const listDates = [...new Set(dates)];
    const series = Object.values(eFormOfPayment)
      .reverse()
      .slice(0, 4)
      .map((value) => {
        return {
          name: formOfPaymentOptions.find((item) => item.id === value)?.name,
          data: listDates.flatMap((date) => {
            const transactionList = this.transactionList.filter((item) => item.idFormOfPayment == value && item.date == date);
            return +transactionList
              .reduce((acc, item) => {
                acc += item.value;
                return acc;
              }, 0)
              .toFixed(2);
          }),
        };
      });
    OPTIONS_PAYMENT.series = series;
    OPTIONS_PAYMENT.xaxis.categories = listDates.map((value) => `${value.split("/").reverse().join("/")} GMT`);
    if (this.$chart) this.$chart.destroy();
    this.$chart = ApexCharts.getChartByID("#chart-payment") || new ApexCharts(document.querySelector("#chart-payment"), OPTIONS_PAYMENT);
    this.$chart.render();
  }

  private validateDateIsFuture(date: Date) {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const isDisabled = today.getTime() > date.getTime();
    return isDisabled;
  }
  private displayBadgeNotifications = badgeUpdate;

  private displayClientAmount() {
    [".current-balance", ".current-limit"].forEach((item) => {
      const $item = document.querySelector(item);
      $item.classList.remove("positive");
      $item.classList.remove("negative");
      let amountToDisplay = 0;
      let isPositive = false;

      if (item === ".current-balance" && this.clientLogged.id) {
        amountToDisplay = this.clientLogged.accountAmount;
        isPositive = amountToDisplay > 0;
      }
      if (item === ".current-limit" && this.cardClient.id) {
        if (this.cardClient.clientID === this.clientLogged.id) {
          amountToDisplay = this.cardClient.limitCreditCurrent;
          isPositive = amountToDisplay > 0;
        }
      }
      $item.classList.add(isPositive ? "positive" : "negative");
      $item.textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amountToDisplay);
    });
  }

  private removeMask(value: string) {
    return +value.replaceAll(".", "").replace(",", ".");
  }

  private sendListener() {
    const isValidDate = this.$inputDate.value && this.$inputDate.value.length === 10 && this.compareDate(this.$inputDate.value) > 0;

    if (!this.$inputValue.value || !this.$inputFormOfPayment.value || !this.$clientID.value || !isValidDate) {
      Toasts.error("Por favor preencha os campos obrigatórios!");
      throw new Error("Por favor preencha os campos obrigatórios!");
    }

    if (this.removeMask(this.$inputValue.value) <= 0) {
      Toasts.error("Selecione um valor valido!");
      throw new Error("Selecione um valor valido!");
    }

    const methodKey = !this.selectedId ? "addTransaction" : "updateTransaction";
    this[methodKey]();

    this.instanceModal().toggle();
    this.renderChart();
    this.applySort();
    this.renderTransactions();
  }
  private onModalHidden() {
    this.transactionFind = null;
    this.selectedId = null;
    this.formDisabled(false);
    this.clearForm();
  }

  private sortByColumn($th: HTMLTableCellElement) {
    const $element = $th.querySelector(".sort");
    const isAscendent = $element?.innerHTML?.includes("arrow_upward");
    const isDescendent = $element?.innerHTML?.includes("arrow_downward");
    const innerHTML = !isAscendent ? "arrow_upward" : "arrow_downward";
    $element.innerHTML = `
        <span class="material-symbols-outlined">
        ${innerHTML}
        </span>
        `;

    if (isDescendent) {
      $element.innerHTML = "";
    }
    const $sorts = document.querySelectorAll(".sort");

    if ([...$sorts].every((element) => element.innerHTML == "")) {
      this.transactionList.sort((a, b) => a.id - b.id);
    } else {
      this.applySort();
    }

    this.renderTransactions();
  }

  duplicateTransaction(id: number) {
    const $titleModal = document.querySelector(".modal-title");
    $titleModal.textContent = "Duplicar transação";

    this.selectedId = null;
    this.transactionFind = this.transactionList.find((transaction) => transaction.id === id);
    this.$inputValue.value = this.numberFormat.format(this.transactionFind.value);
    this.$inputFormOfPayment.value = this.transactionFind.idFormOfPayment.toString();
    this.$inputDate.value = !this.validateDateIsFuture(convertStringDate(this.transactionFind.date))
      ? this.transactionFind.date
      : new Date().toLocaleDateString("pt-BR");
    this.$clientID.value = this.transactionFind.clientID.toString();

    this.instanceModal().toggle();
  }
  addTransaction() {
    const clientSelected = this.clients.find((client) => client.id === +this.$clientID.value);

    this.displayClientAmount();
    this.objectTransaction(clientSelected);
    this.saveTransactionList();
    this.clearForm();
    this.validPayment();
    Toasts.success(this.transactionFind ? "Transação duplicada com sucesso!" : "Transação adicionada com sucesso!");
  }

  updateTransaction() {
    this.transactionFind.value = this.removeMask(this.$inputValue.value);
    this.transactionFind.idFormOfPayment = +this.$inputFormOfPayment.value;
    this.transactionFind.date = this.$inputDate.value;
    this.transactionFind.clientID = +this.$clientID.value;
    this.transactionFind.view = this.transactionFind.view.filter((value) => value != this.clientLogged.id);
    const client = this.clients.find((client) => client.id === +this.$clientID.value);
    this.transactionFind.userLoggedID = this.clientLogged.id;
    this.transactionFind.clientName = `${client?.name} - ${client?.accountNumber}`;
    this.validTransaction(this.transactionFind);
    this.validPayment();
    this.saveTransactionList();
  }
  editTransaction(id: number) {
    const $titleModal = document.querySelector(".modal-title");
    $titleModal.textContent = "Editar transação";
    this.selectedId = id;

    this.transactionFind = this.transactionList.find((transaction) => transaction.id === this.selectedId);

    if (!this.transactionFind) return;

    const { value, idFormOfPayment, date, clientID } = this.transactionFind;

    if (this.transactionFind.dateOfPayDay) {
      this.formDisabled(true);
    }
    this.$inputValue.value = this.numberFormat.format(value);
    this.$inputFormOfPayment.value = idFormOfPayment.toString();
    this.$inputDate.value = date;
    this.$clientID.value = clientID.toString();
    this.instanceModal().toggle();
    this.saveTransactionList();
  }

  removeTransaction(id: number) {
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
      if (result.isConfirmed) {
        this.transactionList = this.transactionList.filter((transaction) => transaction.id !== id);
        this.renderTransactions();
        Toasts.success("Transação removida com sucesso!");
      }
      this.renderChart();
      this.saveTransactionList();
    });
  }

  goToAccountPage() {
    document.querySelector(".modal-backdrop")?.remove();
    setTimeout(() => {
      document.querySelector<HTMLButtonElement>('[data-bs-target="#staticBackdrop"]')?.click();
    }, 500);
  }

  createFormSelectCliente() {
    const clienteOptions = this.clients
      .filter((client) => client.id != this.clientLogged?.id)
      .map((client) => this.createFormOption(client))
      .join("");

    const emptyHTML =
      this.clients.length <= 1
        ? `
        <div class="option" value="">
        Crie uma conta <a href="#account" onclick="document.querySelector('transaction-page').goToAccountPage()">aqui</a>
        </div>`
        : `
        <div class="option" value="">
        Selecione
        </div>`;

    return /*html*/ `
       <form-select class="form-control is-invalid" required placeholder="Selecione">
         ${emptyHTML}
         ${this.clients.length <= 1 ? "" : clienteOptions}
        </form-select>
        `;
  }
  createFormOption(client: Cliente) {
    return `
           <div class="option" value="${client.id}" title="${client?.name} - ${client?.accountNumber}">
           <span abbrev>
           ${client?.name} - ${client?.accountNumber}
           </span>
            </div>
          `;
  }
  createFormSelect() {
    return /*html*/ `
       <form-select class="form-control is-invalid" required placeholder="Selecione">
        <div class="option" value="">
          Selecione
        </div>
        ${this.ngIf(
          !!this.cardClient.id,
          `
          <div class="option" value="${eFormOfPayment.CREDITO}">
            ${SVG_ICONS[eFormOfPayment.CREDITO]}${formOfPaymentOptions[0].name}
          </div>
          `
        )}
        <div class="option" value="${eFormOfPayment.DEBITO}">
         ${SVG_ICONS[eFormOfPayment.DEBITO]}
        ${formOfPaymentOptions[1].name}
        </div>
        <div class="option" value="${eFormOfPayment.DINHEIRO}">
         ${SVG_ICONS[eFormOfPayment.DINHEIRO]}
        ${formOfPaymentOptions[2].name}
        </div>
        <div class="option" value="${eFormOfPayment.PIX}">
         ${SVG_ICONS[eFormOfPayment.PIX]}
        ${formOfPaymentOptions[3].name}
        </div>
       </form-select> 
      `;
  }

  ngIf(condition: boolean, html: string) {
    return (condition && html) || "";
  }
  private sortByDirectionAndKey(direction: string, key: string) {
    const compareCurrency = (currency: number) => currency;
    this.transactionList.sort((a, b) => {
      const firstElement = direction === "asc" ? a : b;
      const secondElement = direction === "asc" ? b : a;
      if (key === "id" || key === "idFormOfPayment") return firstElement[key] - secondElement[key];

      if (key === "value") return compareCurrency(firstElement[key]) - compareCurrency(secondElement[key]);

      if (key === "clientName") return firstElement[key].localeCompare(secondElement[key]);

      if (key === "dateOfPayDay")
        return convertStringDate(firstElement?.[key])?.getTime() - convertStringDate(secondElement?.[key])?.getTime();

      if (key === "date") return this.compareDate(firstElement?.[key]) - this.compareDate(secondElement?.[key]);
    });
  }
  compareDate(date: string) {
    return convertStringDate(date)?.getTime() ?? 0;
  }

  private previousPage() {
    this.page--;

    if (this.page <= 1) {
      this.page = 1;
    }
    this.renderTransactions();
  }
  private nextPage() {
    this.page++;

    if (this.page > this.maxPage) {
      this.page = this.maxPage;
    }
    this.renderTransactions();
  }
  private hiddenElement(condition: boolean) {
    return condition ? "hidden" : "";
  }
  private validPayment() {
    this.transactionList.forEach((transaction) => {
      const actuallyDate = new Date().toLocaleDateString("pt-BR");
      const transactionDate = convertStringDate(transaction.date)?.toLocaleDateString("pt-BR");
      if (!transaction.dateOfPayDay && actuallyDate === transactionDate) {
        try {
          this.makePayment(transaction);
          transaction.dateOfPayDay = new Date().toISOString();
          this.displayClientAmount();
          this.displayBadgeNotifications();
          this.saveTransactionList();
        } catch {
          const nonPayDayList = this.filteredList.filter((value) => !value.dateOfPayDay);
          nonPayDayList.forEach((value) => {
            const text = `A  transação do ID:${value.id} não foi enviada`;
            if (convertStringDate(value.date).toLocaleDateString("pt-BR") === new Date().toLocaleDateString("pt-BR")) Toasts.error(text);
          });
        }
      }
    });
  }

  private makePayment(transaction: Transaction): { clientSelected: Cliente; clients: Cliente[]; clientLogged: Cliente } {
    const clients = this.clients;
    const clientSelected = clients.find((client) => client.id === transaction.clientID);
    const inputValue = +transaction.value;
    const isCredito = transaction.idFormOfPayment === eFormOfPayment.CREDITO;
    const clientLogged = clients.find((client) => client.id === this.clientLogged.id);

    this.validTransaction(transaction);

    if (isCredito) {
      const cardSelected = this.listOfCards.find((card) => card.id === this.cardClient.id);
      if (!cardSelected) {
        Toasts.error("Cartão de crédito não encontrado.");
        throw new Error("Cartão de crédito não encontrado.");
      }
      const limitCreditCurrent = this.cardClient.limitCreditCurrent;
      cardSelected.limitCreditUsed = cardSelected.limitCreditUsed + inputValue;
      cardSelected.limitCreditCurrent = limitCreditCurrent - inputValue;

      this.cardClient = cardSelected;
      const listOfCardsUpdated = this.listOfCards.filter((item) => item.cardNumber !== cardSelected.cardNumber);
      listOfCardsUpdated.push(cardSelected);
      localStorage.setItem("listOfCards", JSON.stringify(listOfCardsUpdated));
    } else {
      const accountAmount = clientLogged.accountAmount;
      clientLogged.accountAmount = accountAmount - inputValue;
    }

    if (clientSelected) {
      clientSelected.accountAmount = clientSelected.accountAmount + inputValue;
    }

    this.saveClientes(clients, clientLogged);
    return { clientSelected, clients, clientLogged };
  }

  private saveClientes(clients: Cliente[], clientLogged: Cliente) {
    localStorage.setItem("clients", JSON.stringify(clients));
    localStorage.setItem("client", JSON.stringify(clientLogged));
  }

  private objectTransaction(clientSelected: Cliente) {
    const newTransaction: Transaction = {
      id: ++this.actuallyId,
      value: this.removeMask(this.$inputValue.value),
      idFormOfPayment: +this.$inputFormOfPayment.value,
      date: this.$inputDate.value,
      clientName: `${clientSelected?.name} - ${clientSelected?.accountNumber}`,
      clientID: +this.$clientID.value,
      userLoggedID: this.clientLogged.id,
      creditCardID: +this.$inputFormOfPayment.value === eFormOfPayment.CREDITO ? this.cardClient.id : null,
      view: [],
    };
    this.validTransaction(newTransaction);

    this.transactionList.push(newTransaction);
  }
  private validTransaction(transaction: Transaction) {
    const clientLogged = this.clients.find((client) => client.id === this.clientLogged.id);
    const clientAccountAmount = clientLogged.accountAmount;
    const propertyName = transaction.idFormOfPayment === eFormOfPayment.CREDITO ? "limitCreditCurrent" : "accountAmount";
    const valueOfDebit = propertyName === "accountAmount" ? clientAccountAmount : this.cardClient.limitCreditCurrent;

    if (transaction.value > valueOfDebit) {
      Toasts.error("Saldo insuficiente!");
      throw new Error("Saldo insuficiente!");
    }
  }

  private formDisabled(isDisabled: boolean) {
    this.$inputValue.disabled = isDisabled;
    this.$inputDate.disabled = isDisabled;
    this.$inputFormOfPayment.disabled = isDisabled;
    this.$inputValue.disabled = isDisabled;
    this.$clientID.disabled = isDisabled;
  }

  private saveTransactionList() {
    const transactionList = [
      ...this.originalList.filter((item: Transaction) => item.userLoggedID !== this.clientLogged.id),
      ...this.transactionList,
    ];
    transactionList.sort((a, b) => a.id - b.id);
    localStorage.setItem("transactionList", JSON.stringify(transactionList));
    localStorage.setItem("actuallyId", this.actuallyId.toString());
  }
  private clearForm() {
    const $titleModal = document.querySelector(".modal-title");
    $titleModal.textContent = "Adicionar transação";
    this.$inputValue.value = "";
    this.$inputFormOfPayment.value = "";
    this.$inputDate.value = "";
    this.$clientID.value = "";
  }
  private instanceModal() {
    return Modal.getOrCreateInstance(this.$modal);
  }
}
