import Currency from "@tadashi/currency";
import { Modal } from "bootstrap";
import { FormSelect } from "../../components/form-select/form-select";
import { SVG_ICONS } from "../../constants/svg-icons";
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
  transactionList: Transaction[] = [
    {
      date: "24/09/2001",
      description: "Pix",
      id: 1,
      name: "João Vitor Pereira dos Santos",
      value: "5.000,00",
    },
  ];
  $btnSend: HTMLButtonElement;
  $inputValue: HTMLInputElement;
  $inputDescription: FormSelect;
  $inputDate: HTMLInputElement;
  $inputName: HTMLInputElement;
  $edit: HTMLSpanElement;
  $delete: HTMLSpanElement;
  $modal: HTMLElement;
  idActual: number = 0;
  idSelected: number;
  listFind: Transaction;
  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
    this.addListeners();

    this.rendeScreen();
  }

  recoveryElementRef() {
    const [$formInputValue, $formInputDescription, $formInputDate, $formInputName] = document.querySelectorAll(".form-control");

    this.$inputValue = $formInputValue as HTMLInputElement;
    this.$inputDescription = $formInputDescription as FormSelect;
    this.$inputDate = $formInputDate as HTMLInputElement;
    this.$inputName = $formInputName as HTMLInputElement;
    this.$modal = document.querySelector("#staticBackdrop");
    this.$btnSend = document.querySelector(".btn-send");
    this.$edit = document.querySelector(".edit");
    this.$delete = document.querySelector(".delete");
  }

  addListeners() {
    this.mask = new Currency(this.$inputValue);

    this.$btnSend.addEventListener("click", () => {
      if (!this.idSelected) {
        this.addTransaction();
      } else {
        this.updateTransaction();
      }
      this.instanceModal().toggle();
      this.rendeScreen();
    });
  }

  private instanceModal() {
    return Modal.getOrCreateInstance(this.$modal);
  }
  private addTransaction() {
    const transactionObject: Transaction = {
      id: ++this.idActual,
      value: this.$inputValue.value,
      description: this.$inputDescription.value,
      date: this.$inputDate.value,
      name: this.$inputName.value,
    };
    this.clearForm();
    this.transactionList.push(transactionObject);
  }
  private clearForm() {
    this.$inputValue.value = "";
    this.$inputDescription.value = "";
    this.$inputDate.value = "";
    this.$inputName.value = "";
  }

  updateTransaction() {
    this.listFind.value = this.$inputValue.value;
    this.listFind.description = this.$inputDescription.value;
    this.listFind.date = this.$inputDate.value;
    this.listFind.name = this.$inputName.value;
  }
  rendeScreen() {
    const $tbody = document.querySelector("tbody");
    $tbody.innerHTML = "";
    this.transactionList.forEach((transaction) => {
      $tbody.innerHTML += /*html*/ ` 
     <tr id='option-of-transaction-${transaction.id}'>
       <th scope="row">${transaction.id}</th>
       <td>${transaction.value}</td>
       <td>
         ${SVG_ICONS[transaction.description]}  
        ${transaction.description}
      </td>
      <td>${transaction.date}</td>
      <td>${transaction.name}</td>
      <td>
        <span class="material-symbols-outlined edit" onclick="document.querySelector('about-page').onEdit(${transaction.id})" >
          edit
        </span>
        <span class="material-symbols-outlined delete"onclick="document.querySelector('about-page').onRemove(${transaction.id})">
          delete
        </span>
      </td>
    </tr>`;
    });
  }
  onRemove(id: number) {
    const $tbody = document.querySelector(`#option-of-transaction-${id}`);
    this.transactionList = this.transactionList.filter((itemValue) => itemValue.id !== id);
    $tbody.remove();
  }
  onEdit(id: number) {
    this.idSelected = id;
    this.listFind = this.transactionList.find((itemValue) => itemValue.id === this.idSelected);
    this.$inputValue.value = this.listFind.value;
    this.$inputDescription.value = this.listFind.description;
    this.$inputDate.value = this.listFind.date;
    this.$inputName.value = this.listFind.name;

    this.instanceModal().toggle();
    this.$modal.addEventListener("hidden.bs.modal", () => {
      this.listFind = null;
      this.idSelected = null;
      this.clearForm();
    });
  }

  createInnerHTML() {
    this.innerHTML = /*html*/ `
      <button type="button" class="btn btn-transaction mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <span class="material-symbols-outlined icon"> forward </span>Fazer uma transação
      </button>
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
}
