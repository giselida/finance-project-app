import Currency from "@tadashi/currency";
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
  $formControls: NodeListOf<HTMLInputElement>;
  $btnSend: HTMLButtonElement;
  $inputValue: HTMLInputElement;
  $inputDescription: HTMLInputElement;
  $inputDate: HTMLInputElement;
  $inputName: HTMLInputElement;

  connectedCallback() {
    this.innerHTML = this.createInnerHTML();
    const $description = this.querySelector(".description");

    $description.innerHTML += this.createFormSelect();
    this.recoveryElementRef();
    this.addListeners();
    this.rendeScreen();
  }
  recoveryElementRef() {
    this.$formControls = document.querySelectorAll(".form-control");
    this.$btnSend = document.querySelector(".btn-send");
  }

  addListeners() {
    const [$formInputValue] = this.$formControls;
    this.mask = new Currency($formInputValue);

    this.$btnSend.addEventListener("click", () => {
      this.rendeScreen();
    });
  }
  rendeScreen() {
    const $tbody = document.querySelector("tbody");

    const [$formInputValue, $formInputDescription, $formInputDate, $formInputName] = this.$formControls;
    $tbody.innerHTML += /*html*/ ` 
     <tr>
      <th scope="row">${$tbody.childElementCount + 1}</th>
      <td>${$formInputValue?.value}</td>
      <td>
        ${SVG_ICONS[$formInputDescription?.value]}  
        ${$formInputDescription?.value}
      </td>
      <td>${$formInputDate?.value}</td>
      <td>${$formInputName?.value}</td>
    </tr>`;
  }

  createInnerHTML() {
    return /*html*/ `
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
                    value="70,70"
                    pattern="[0-9]+,[0-9]{2}||[0-9]+(.[0-9]{3})*,[0-9]{2}"
                    required
                  />
                </div>
                <div class="form-input description">
                  <label class="col-form-label">Descrição:</label>
                </div>
                <div class="form-input">
                  <label class="col-form-label">Data:</label>
                  <input type="text" class="form-control" value="01/01/01" required />
                </div>
                <div class="form-input">
                  <label class="col-form-label">Nome:</label>
                  <input type="text" class="form-control" value="Não posso" required />
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
          </tr>
        </thead>
        <tbody></tbody>
      </table>
  </div>
    `;
  }
  createFormSelect() {
    return /*html*/ `
       <form-select class="form-control" required placeholder="Selecione" value="Pix" >
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
