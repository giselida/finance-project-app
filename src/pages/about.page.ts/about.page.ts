import Currency from "@tadashi/currency";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import { Modal } from "bootstrap";
import { FormSelect } from "../../components/form-select/form-select";
import { PT_BR_LOCALE } from "../../constants/apexChats";
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

  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
    this.addListeners();
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
    this.$btnSend = document.querySelector(".btn-send");
    this.$edit = document.querySelector(".edit");
    this.$delete = document.querySelector(".delete");
    this.$search = document.querySelector(".form-search");
    this.$previous = document.querySelector(".page-previous");
    this.$next = document.querySelector(".page-next");
    this.$pageActually = document.querySelector(".page-actually");
  }

  addListeners() {
    this.mask = new Currency(this.$inputValue);
    this.$btnSend.addEventListener("click", () => {
      if (!this.$inputValue.value || !this.$inputDescription.value || !this.$inputDate.value || !this.$inputName.value)
        return Toasts.error("Por favor preencha os campos obrigatórios");
      const methodKey = !this.selectedId ? "addTransaction" : "updateTransaction";
      this[methodKey]();
      this.instanceModal().toggle();
      this.renderTransactions();
    });
    this.$modal.addEventListener("hidden.bs.modal", () => {
      this.transactionFind = null;
      this.selectedId = null;
      this.clearForm();
    });
    this.$search.addEventListener("input", () => {
      this.renderTransactions();
    });
    this.nextListener();
    this.previousListener();
    this.datePicker = new AirDatepicker(this.$inputDate, { locale: PT_BR_LOCALE });
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
    this.setStorage();

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
        <span class="material-symbols-outlined edit" onclick="document.querySelector('about-page').editTransaction(${transaction.id})" >
          edit
        </span>
        <span class="material-symbols-outlined delete"onclick="document.querySelector('about-page').removeTransaction(${transaction.id})">
          delete
        </span>
      </td>
    </tr>`;
    });
  }
  get filteredList() {
    return this.transactionList.filter((item) => {
      return Object.values(item).some((item) => item.toString().toLowerCase().includes(this.$search.value.toLowerCase()));
    });
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
  }
  removeTransaction(id: number) {
    this.transactionList = this.transactionList.filter((transaction) => transaction.id !== id);
    this.setStorage();
    this.renderTransactions();
  }
  private setStorage() {
    localStorage.setItem("transactionList", JSON.stringify(this.transactionList));
    localStorage.setItem("actuallyId", this.actuallyId.toString());
  }

  createInnerHTML() {
    this.innerHTML = /*html*/ `
<div class="content-row mb-3">
        <button type="button" class="btn btn-transaction" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
      <span class="material-symbols-outlined icon"> forward </span>Fazer uma transação
    </button>
    <div class="group-input">
  <div class="input-group-text"><span class="material-symbols-outlined">
search
</span></div>
  <input type="text" class="form-search">
</div>

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
      <div class="table-container" >
      <table class="table table-sm table-hover table-bordered">
        <thead class="table-warning">
          <tr style="position: sticky;top: 0;">
            <th scope="col">#</th>
            <th scope="col">Valor</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
  </div>
 <nav aria-label="Page navigation ">
  <ul class="pagination">
    <li class="page-item">
      <button class="page-link page-previous" aria-label="Previous" disabled>
        <span class="previous" >&laquo;</span>
      </button>
    </li>
    <li class="page-item">
      <div class="page-link page-actually" >1</div>
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
    this.$inputValue.value = "";
    this.$inputDescription.value = "";
    this.$inputDate.value = "";
    this.$inputName.value = "";
  }
  private instanceModal() {
    return Modal.getOrCreateInstance(this.$modal);
  }
}
