import Currency from "@tadashi/currency";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import ApexCharts from "apexcharts";
import { Modal } from "bootstrap";
import IMask from "imask";
import { FormSelect } from "../../components/form-select/form-select";
import { PT_BR_LOCALE } from "../../constants/apexChats";
import { OPTIONS } from "../../constants/charts";
import { SVG_ICONS } from "../../constants/svg-icons";
import { Toasts } from "../../toasts/toast";
import "./about.page.scss";
interface Transaction {
  id: number;
  value: string;
  description: string;
  name: string;
  date: string;
}
export class AboutPage extends HTMLElement {
  mask: typeof Currency;
  $inputDescription: FormSelect;
  $btnSend: HTMLButtonElement;
  $inputValue: HTMLInputElement;
  $inputDate: HTMLInputElement;
  $inputName: HTMLInputElement;
  $search: HTMLInputElement;
  $edit: HTMLSpanElement;
  $delete: HTMLSpanElement;
  $modal: HTMLElement;
  $order: HTMLElement;
  $previous: HTMLButtonElement;
  $next: HTMLButtonElement;
  actuallyId: number = 0;
  selectedId: number;
  page: number = 1;
  pageSize: number = 5;
  maxPage: number;
  transactionList: Transaction[];
  transactionFind: Transaction;
  datePicker: AirDatepicker;
  $pageActually: HTMLElement;
  $tableHeaders: NodeListOf<HTMLTableCellElement>;
  chart: ApexCharts;

  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
    this.addListeners();
    this.onChart();
    this.renderTransactions();
  }

  recoveryElementRef() {
    this.transactionList = JSON.parse(localStorage.getItem("transactionList")) ?? [];
    this.actuallyId = +localStorage.getItem("actuallyId");

    const [$formInputValue, $formInputDescription, $formInputDate, $formInputName] = document.querySelectorAll(".form-control");
    this.$inputValue = $formInputValue as HTMLInputElement;
    this.$inputDescription = $formInputDescription as FormSelect;
    this.$inputDate = $formInputDate as HTMLInputElement;
    this.$inputName = $formInputName as HTMLInputElement;
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
  addListeners() {
    const maskOptions = {
      mask: "00/00/0000",
    };
    IMask(this.$inputDate, maskOptions);
    this.mask = new Currency(this.$inputValue);
    this.sendListener();
    this.onModalHidden();
    this.$search.addEventListener("input", () => this.renderTransactions());
    this.sortListener();
    this.nextListener();
    this.previousListener();
    this.datePicker = new AirDatepicker(this.$inputDate, { locale: PT_BR_LOCALE });
  }

  private getDate(dateString: string) {
    const [day, mouth, year] = dateString.split("/");
    return new Date(+year, +mouth - 1, +day);
  }

  private onChart() {
    const dates = this.transactionList.map((value) => value.date);
    dates.sort((a, b) => this.getDate(a).getTime() - this.getDate(b).getTime());
    const listDates = [...new Set(dates)];

    OPTIONS.series = ["Credito", "Debito", "Dinheiro", "Pix"].map((value) => {
      return {
        name: value,
        data: listDates.flatMap((date) => {
          const transactionList = this.transactionList.filter((item) => item.description == value && item.date == date);

          return transactionList.length <= 0 ? null : transactionList.map((item) => +item.value.replace(".", "").replace(",", "."));
        }),
      };
    });
    OPTIONS.xaxis.categories = Array.from(
      { length: Math.max(...OPTIONS.series.map((value) => value.data.length)) },
      (_, k) => listDates[k] ?? "-"
    );

    this.chart = new ApexCharts(document.querySelector("#chart"), OPTIONS);
    this.chart.render();
    this.chart.updateSeries(OPTIONS.series);
  }

  private sendListener() {
    this.$btnSend.addEventListener("click", () => {
      if (!this.$inputValue.value || !this.$inputDescription.value || !this.$inputDate.value || !this.$inputName.value)
        return Toasts.error("Por favor preencha os campos obrigatórios!");
      const methodKey = !this.selectedId ? "addTransaction" : "updateTransaction";
      this[methodKey]();
      this.onChart();
      this.instanceModal().toggle();
      this.renderTransactions();
    });
  }

  private onModalHidden() {
    this.$modal.addEventListener("hidden.bs.modal", () => {
      this.transactionFind = null;
      this.selectedId = null;
      this.clearForm();
    });
  }

  private sortListener() {
    this.$tableHeaders.forEach(($th) => {
      $th.addEventListener("click", () => {
        const $element = $th.querySelector(".sort");
        const isAscendent = $element.innerHTML.includes("arrow_upward");
        const isDescendent = $element.innerHTML.includes("arrow_downward");

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

      if (key === "description") return firstElement[key].localeCompare(secondElement[key]);

      if (key === "name") return firstElement[key].localeCompare(secondElement[key]);

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
    if (this.filteredList.length < 1) {
      this.actuallyId = 0;
    }
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
           ${SVG_ICONS[transaction.description]}  
           ${transaction.description}
      </td>
      <td>${transaction.date}</td>
      <td>${transaction.name}</td>
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
      return Object.values(item).some((item) => item.toString().toLowerCase().includes(this.$search.value.toLowerCase()));
    });
  }
  duplicateTransaction(id: number) {
    const $titleModal = document.querySelector(".modal-title");
    $titleModal.textContent = "Duplicar transação";

    this.selectedId = null;
    this.transactionFind = this.transactionList.find((transaction) => transaction.id === id);
    this.$inputValue.value = this.transactionFind.value;
    this.$inputDescription.value = this.transactionFind.description;
    this.$inputDate.value = this.transactionFind.date;
    this.$inputName.value = this.transactionFind.name;

    this.instanceModal().toggle();
  }
  addTransaction() {
    const newTransaction: Transaction = {
      id: ++this.actuallyId,
      value: this.$inputValue.value,
      description: this.$inputDescription.value,
      date: this.$inputDate.value,
      name: this.$inputName.value,
    };
    this.transactionList.push(newTransaction);
    this.setStorage();
    this.clearForm();
    Toasts.success(this.transactionFind ? "Transação duplicada com sucesso!" : "Transação adicionada com sucesso!");
  }

  updateTransaction() {
    this.transactionFind.value = this.$inputValue.value;
    this.transactionFind.description = this.$inputDescription.value;
    this.transactionFind.date = this.$inputDate.value;
    this.transactionFind.name = this.$inputName.value;
  }
  editTransaction(id: number) {
    const $titleModal = document.querySelector(".modal-title");
    $titleModal.textContent = "Editar transação";
    this.selectedId = id;
    this.transactionFind = this.transactionList.find((transaction) => transaction.id === this.selectedId);

    if (!this.transactionFind) return;

    this.$inputValue.value = this.transactionFind.value;
    this.$inputDescription.value = this.transactionFind.description;
    this.$inputDate.value = this.transactionFind.date;
    this.$inputName.value = this.transactionFind.name;
    this.instanceModal().toggle();
    this.setStorage();
  }
  removeTransaction(id: number) {
    this.transactionList = this.transactionList.filter((transaction) => transaction.id !== id);
    this.setStorage();
    this.onChart();
    this.renderTransactions();
    Toasts.success("Transação removida com sucesso!");
  }
  private setStorage() {
    localStorage.setItem("transactionList", JSON.stringify(this.transactionList));
    localStorage.setItem("actuallyId", this.actuallyId.toString());
  }

  createInnerHTML() {
    this.innerHTML = /*html*/ `
    <div id="chart"></div>

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
              </div>
              <div class="form-input description">
                <label class="col-form-label">Descrição:</label>
              </div>
              <div class="form-input">
                <label class="col-form-label">Data:</label>
                <input type="text" class="form-control" required />
              </div>
              <div class="form-input">
                <label class="col-form-label">Nome:</label>
                <input type="text" class="form-control" required />
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
      <table class="table table-sm table-hover table-bordered">
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
            <th scope="col" key="description">
              <div class="row-header">
                <span>Descrição</span>
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
    this.$inputDescription.value = "";
    this.$inputDate.value = "";
    this.$inputName.value = "";
  }
  private instanceModal() {
    return Modal.getOrCreateInstance(this.$modal);
  }
}
