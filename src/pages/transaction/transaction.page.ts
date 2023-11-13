import Currency from "@tadashi/currency";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import ApexCharts from "apexcharts";
import { Modal } from "bootstrap";
import IMask from "imask";
import { FormSelect } from "../../components/form-select/form-select";
import { OPTIONS_PAYMENT } from "../../constants/charts";
import { PT_BR_LOCALE } from "../../constants/date-picker-locale";
import { SVG_ICONS } from "../../constants/svg-icons";
import { Toasts } from "../../toasts/toast";
import { Cliente } from "../home/home.page";
import "./transaction.page.scss";
interface Transaction {
  id: number;
  value: string;
  formOfPayment: string;
  clientName: string;
  clientID: string;
  userLoggedID: string;
  creditLimit: number;
  date: string;
}
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
  $previous: HTMLButtonElement;
  $next: HTMLButtonElement;
  actuallyId: number = +localStorage.getItem("actuallyId");
  selectedId: number;
  page: number = 1;
  pageSize: number = 5;
  maxPage: number;
  transactionList: Transaction[];
  transactionFind: Transaction;
  datePicker: AirDatepicker;
  $pageActually: HTMLElement;
  $tableHeaders: NodeListOf<HTMLTableCellElement>;
  $chart: ApexCharts;
  originalList: any;
  get clientLogged() {
    return JSON.parse(localStorage.getItem("client") ?? "{}");
  }

  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
    this.addListeners();
    this.renderTransactions();
    this.onChart();
  }

  recoveryElementRef() {
    this.originalList = JSON.parse(localStorage.getItem("transactionList")) ?? [];
    this.transactionList = this.originalList.filter((item: Transaction) => item.userLoggedID === this.clientLogged.id);
    if (!this.clientLogged.id) {
      localStorage.removeItem("transactionList");
    }
    this.setCurrentAmount();
    const [$formInputValue, $formInputFormOfPayment, $formInputDate, $formInputName] = document.querySelectorAll(".form-control");
    this.$inputValue = $formInputValue as HTMLInputElement;
    this.$inputFormOfPayment = $formInputFormOfPayment as FormSelect;
    this.$inputDate = $formInputDate as HTMLInputElement;
    this.$clientID = $formInputName as HTMLInputElement;
    this.$modal = document.querySelector("#staticBackdrop");
    this.$tableHeaders = document.querySelectorAll("th");
    this.$btnSend = document.querySelector(".btn-send");
    this.$edit = document.querySelector(".edit");
    this.$delete = document.querySelector(".delete");
    this.$search = document.querySelector(".form-search");
    this.$previous = document.querySelector(".page-previous");
    this.$next = document.querySelector(".page-next");
    this.$pageActually = document.querySelector(".page-actually");
  }
  private setCurrentAmount() {
    const $currentBalance = document.querySelector(".current-balance");
    $currentBalance.classList.remove("positive");
    $currentBalance.classList.remove("negative");

    $currentBalance.classList.add(this.clientLogged.accountAmount > 0 ? "positive" : "negative");
    $currentBalance.textContent = `${new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.clientLogged.accountAmount)}`;
  }

  addListeners() {
    const maskOptions = {
      mask: "00/00/0000",
    };
    IMask(this.$inputDate, maskOptions);
    this.mask = new Currency(this.$inputValue);

    this.sendListener();
    this.onModalHidden();
    this.$search.addEventListener(
      "input",
      this.debounceEvent(() => this.renderTransactions(), 500)
    );
    this.sortListener();
    this.nextListener();
    this.previousListener();
    this.datePicker = new AirDatepicker(this.$inputDate, { locale: PT_BR_LOCALE });
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

  private getDate(dateString: string) {
    const [day, mouth, year] = dateString.split("/");
    return new Date(+year, +mouth - 1, +day);
  }

  private onChart() {
    const dates = this.transactionList.map((value) => value.date);
    dates.sort((a, b) => this.getDate(a).getTime() - this.getDate(b).getTime());
    const listDates = [...new Set(dates)];
    const formPayment = ["Credito", "Debito", "Dinheiro", "Pix"];
    OPTIONS_PAYMENT.series = formPayment.map((value) => {
      return {
        name: value,
        data: listDates.flatMap((date) => {
          const transactionList = this.transactionList.filter((item) => item.formOfPayment == value && item.date == date);

          return transactionList.length <= 0 ? null : transactionList.map((item) => +item.value.replace(".", "").replace(",", "."));
        }),
      };
    });
    OPTIONS_PAYMENT.xaxis.categories = Array.from(
      { length: Math.max(...OPTIONS_PAYMENT.series.map((value) => value.data.length)) },
      (_, k) => listDates[k] ?? "-"
    );
    this.$chart = new ApexCharts(document.querySelector("#chart-payment"), OPTIONS_PAYMENT);
    this.$chart.render();
    this.$chart.resetSeries();
    this.$chart.updateSeries(OPTIONS_PAYMENT.series);
  }

  private sendListener() {
    this.$btnSend.addEventListener("click", () => {
      if (!this.$inputValue.value || !this.$inputFormOfPayment.value || !this.$inputDate.value || !this.$clientID.value) {
        Toasts.error("Por favor preencha os campos obrigatórios!");
        throw new Error("Por favor preencha os campos obrigatórios!");
      }

      const methodKey = !this.selectedId ? "addTransaction" : "updateTransaction";
      this[methodKey]();
      this.instanceModal().toggle();
      this.onChart();
      this.renderTransactions();
    });
  }

  private onModalHidden() {
    this.$modal.addEventListener("hidden.bs.modal", () => {
      this.transactionFind = null;
      this.selectedId = null;
      this.$inputValue.disabled = false;
      this.clearForm();
    });
  }

  private sortListener() {
    this.$tableHeaders.forEach(($th) => {
      $th.addEventListener("click", () => {
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
          $sorts.forEach((element) => {
            if (element.innerHTML == "") return;
            const $th = element.parentElement.parentElement;
            const direction = element.innerHTML.includes("arrow_upward") ? "asc" : "desc";
            this.sortByDirectionAndKey(direction, $th.getAttribute("key"));
          });
        }

        this.renderTransactions();
      });
    });
  }

  private sortByDirectionAndKey(direction: string, key: string) {
    const compareDate = (date: string) => new Date(date.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, "$2-$1-$3")).getTime();
    const compareCurrency = (currency: string) => +currency.replace(",", ".");

    this.transactionList.sort((a, b) => {
      const firstElement = direction === "asc" ? a : b;
      const secondElement = direction === "asc" ? b : a;

      if (key === "id") return firstElement[key] - secondElement[key];

      if (key === "value") return compareCurrency(firstElement[key]) - compareCurrency(secondElement[key]);

      if (key === "formOfPayment") return firstElement[key].localeCompare(secondElement[key]);

      if (key === "clientName") return firstElement[key].localeCompare(secondElement[key]);

      if (key === "date") return compareDate(firstElement[key]) - compareDate(secondElement[key]);
    });
  }

  private previousListener() {
    this.$previous.addEventListener("click", () => {
      this.page--;
      if (this.page <= 1) {
        this.page = 1;
      }
      this.renderTransactions();
    });
  }
  private nextListener() {
    this.$next.addEventListener("click", () => {
      this.page++;

      if (this.page > this.maxPage) {
        this.page = this.maxPage;
      }
      this.renderTransactions();
    });
  }

  renderTransactions(transactions: Transaction[] = this.filteredList) {
    this.maxPage = Math.ceil(this.filteredList.length / this.pageSize);
    if (this.maxPage < 1) {
      this.maxPage = 1;
    }
    this.$previous.disabled = this.page == 1;
    this.$next.disabled = this.maxPage == this.page;

    const $tbody = document.querySelector("tbody");
    const $table = document.querySelector("table");
    const $pagination = document.querySelector<HTMLElement>(".container-pagination");

    $pagination.hidden = this.filteredList.length < 1;

    $table.hidden = this.filteredList.length < 1;

    const actuallyPage = (this.page - 1) * this.pageSize;
    const nextPage = actuallyPage + this.pageSize;

    $tbody.innerHTML = "";
    this.$pageActually.textContent = this.page.toString();
    transactions.slice(actuallyPage, nextPage).forEach((transaction) => {
      $tbody.innerHTML += /*html*/ ` 
       <tr id="option-of-transaction-${transaction.id}">
         <td scope="row">${transaction.id}</td>
         <td>${transaction.value}</td>
         <td>
           ${SVG_ICONS[transaction.formOfPayment]}  
           ${transaction.formOfPayment}
      </td>
      <td>${transaction.date}</td>
      <td>${transaction.clientName}</td>
      <td>
        <ion-icon name="brush-outline" class="edit" onclick="document.querySelector('about-page').editTransaction(${
          transaction.id
        })"></ion-icon>
        <ion-icon name="trash-outline" class="delete" onclick="document.querySelector('about-page').removeTransaction(${
          transaction.id
        })"></ion-icon>
        <ion-icon name="duplicate-outline" class="duplicate"
        onclick="document.querySelector('about-page').duplicateTransaction(${transaction.id})"></ion-icon>
      </td>
    </tr>`;
    });
  }
  get filteredList() {
    return this.transactionList.filter((item) => {
      return (
        item.userLoggedID === this.clientLogged.id &&
        Object.values(item).some((item) => item.toString().toLowerCase().includes(this.$search.value.toLowerCase()))
      );
    });
  }
  duplicateTransaction(id: number) {
    const $titleModal = document.querySelector(".modal-title");
    $titleModal.textContent = "Duplicar transação";

    this.selectedId = null;
    this.transactionFind = this.transactionList.find((transaction) => transaction.id === id);
    this.$inputValue.value = this.transactionFind.value;
    this.$inputFormOfPayment.value = this.transactionFind.formOfPayment;
    this.$inputDate.value = this.transactionFind.date;
    this.$clientID.value = this.transactionFind.clientName;

    this.instanceModal().toggle();
  }
  addTransaction() {
    if (+this.$inputValue.value.replace(".", "").replace(",", ".") <= 0) {
      Toasts.error("Selecione um valor valido!");
      throw new Error("Selecione um valor valido!");
    }
    const clients: Cliente[] = JSON.parse(localStorage.getItem("clients") ?? "[]");

    const clientLogged = clients.find((client) => client.id === this.clientLogged.id);

    const clientSelected = clients.find((client) => client.id === +this.$clientID.value);
    const inputValue = +this.$inputValue.value.replace(".", "").replace(",", ".");

    if (this.$inputFormOfPayment.value === "Credito") {
      clientLogged.limitCredit = clientLogged.limitCredit - inputValue;
      clientSelected.accountAmount = clientSelected.accountAmount + inputValue;
    } else {
      clientLogged.accountAmount = clientLogged.accountAmount - inputValue;

      clientSelected.accountAmount = clientSelected.accountAmount + inputValue;
    }
    if (inputValue > clientLogged.accountAmount || inputValue > clientLogged.limitCredit) {
      Toasts.error("Saldo insuficiente!");
      throw new Error("Saldo insuficiente!");
    }

    localStorage.setItem("client", JSON.stringify(clientLogged));
    this.setCurrentAmount();
    this.objectTransaction(clientSelected);
    this.setStorageClient(clients, clientSelected, clientLogged);
    this.setStorage();
    this.clearForm();
    Toasts.success(this.transactionFind ? "Transação duplicada com sucesso!" : "Transação adicionada com sucesso!");
  }

  private objectTransaction(clientSelected: Cliente) {
    const newTransaction: Transaction = {
      id: ++this.actuallyId,
      value: this.$inputValue.value,
      formOfPayment: this.$inputFormOfPayment.value,
      date: this.$inputDate.value,
      clientName: `${clientSelected.name} - ${clientSelected.accountNumber}`,
      clientID: this.$clientID.value,
      userLoggedID: this.clientLogged.id,
      creditLimit: this.clientLogged.limitCredit,
    };

    this.transactionList.push(newTransaction);
  }

  private setStorageClient(clients: Cliente[], clientSelected: Cliente, clientLogged: Cliente) {
    localStorage.setItem("clients", JSON.stringify(clients));
    localStorage.setItem("client", JSON.stringify(clientSelected));
    localStorage.setItem("client", JSON.stringify(clientLogged));
  }

  updateTransaction() {
    this.transactionFind.value = this.$inputValue.value;
    this.transactionFind.formOfPayment = this.$inputFormOfPayment.value;
    this.transactionFind.date = this.$inputDate.value;
    this.transactionFind.clientID = this.$clientID.value;
    const clients: Cliente[] = JSON.parse(localStorage.getItem("clients") ?? "[]");
    const client = clients.find((client) => client.id === +this.$clientID.value);

    this.transactionFind.userLoggedID = this.clientLogged.id;
    this.transactionFind.clientName = `${client.name} - ${client.accountNumber}`;
    this.setStorage();
  }
  editTransaction(id: number) {
    const $titleModal = document.querySelector(".modal-title");
    $titleModal.textContent = "Editar transação";
    this.selectedId = id;

    this.transactionFind = this.transactionList.find((transaction) => transaction.id === this.selectedId);

    if (!this.transactionFind) return;
    this.$inputValue.disabled = this.selectedId == id;
    this.$inputValue.value = this.transactionFind.value;
    this.$inputFormOfPayment.value = this.transactionFind.formOfPayment;
    this.$inputDate.value = this.transactionFind.date;
    this.$clientID.value = this.transactionFind.clientID;
    this.instanceModal().toggle();
    this.setStorage();
  }

  removeTransaction(id: number) {
    this.transactionList = this.transactionList.filter((transaction) => transaction.id !== id);
    this.renderTransactions();
    Toasts.success("Transação removida com sucesso!");
    this.onChart();
    this.setStorage();
  }
  private setStorage() {
    localStorage.setItem(
      "transactionList",
      JSON.stringify([
        ...this.originalList.filter((item: Transaction) => item.userLoggedID !== this.clientLogged.id),
        ...this.transactionList,
      ])
    );
    localStorage.setItem("actuallyId", this.actuallyId.toString());
  }

  createInnerHTML() {
    this.innerHTML = /*html*/ `

    <div class="container-current-balance">Saldo: <span class="current-balance">0,00</span></div>
    <div id="chart-payment"></div>
    <div class="content-row mb-3">
      <button type="button" class="btn btn-transaction" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <span class="material-symbols-outlined icon"> forward </span>
        Fazer uma transação
      </button>
      <div class="group-input">
        <div class="input-group-text">
          <span class="material-symbols-outlined"> search </span>
        </div>
        <input type="text" class="form-search" />
      </div>
    </div>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-2" id="staticBackdropLabel">Transação</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="was-validated">
              <div class="form-input">
                <label class="col-form-label">Valor:</label>
                <input
                  type="text"
                  class="form-control"
                  autocomplete="transaction-currency"
                  pattern="[0-9]+,[0-9]{2}||[0-9]+(.[0-9]{3})*,[0-9]{2}"
                  required
                />  
                <div class="valid-feedback">
                </div>
                <div class="invalid-feedback">
                </div>
              </div>
              <div class="form-input description">
                <label class="col-form-label">Forma de pagamento:</label>
              </div>
              <div class="form-input">
                <label class="col-form-label">Data:</label>
                <input type="text" class="form-control" required />
              </div>
              <div class="form-input client">
                <label class="col-form-label">Cliente:</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-send">Enviar</button>
            <button type="button" class="btn btn-closed" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="table table-hover table-bordered">
        <thead class="table-warning">
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
  createFormSelectCliente() {
    const clients: Cliente[] = JSON.parse(localStorage.getItem("clients") ?? "[]");
    const clienteOptions = clients
      .filter((client) => client.id != this.clientLogged.id)
      .map((client) => {
        return `
           <div class="option" value="${client.id}">
            ${client.name} - ${client.accountNumber}
            </div>
          `;
      })
      .join("");
    return /*html*/ `
       <form-select class="form-control is-invalid" required placeholder="Selecione">
        ${clienteOptions}
       </form-select>
    `;
  }
  createFormSelect() {
    return /*html*/ `
       <form-select class="form-control is-invalid" required placeholder="Selecione">
        <div class="option" value="">
          Selecione
        </div>
        <div class="option" value="Debito">
         ${SVG_ICONS.Debito}
          Debito
        </div>
        <div class="option" value="Credito">
          ${SVG_ICONS.Credito}
          Credito
        </div>
        <div class="option" value="Dinheiro">
         ${SVG_ICONS.Dinheiro}
          Dinheiro
        </div>
        <div class="option" value="Pix">
         ${SVG_ICONS.Pix}
          Pix
        </div>
       </form-select> 
      `;
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
