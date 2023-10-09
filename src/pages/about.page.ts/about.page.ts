import Currency from "@tadashi/currency";
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

  connectedCallback() {
    this.innerHTML = this.createInnerHTML();
    this.addListeners();
    this.rendeScreen();
  }

  addListeners() {
    this.$formControls = document.querySelectorAll(".form-control");
    const $btnSend = document.querySelector(".btn-send");

    const [$formInputValue] = this.$formControls;
    this.mask = new Currency($formInputValue);

    $btnSend.addEventListener("click", () => {
      this.rendeScreen();
    });
  }
  rendeScreen() {
    const $tbody = document.querySelector("tbody");
    const [$formInputValue, $formInputDescription, $formInputDate, $formInputName] = this.$formControls;
    $tbody.innerHTML += /*html*/ ` 
     <tr>
      <th scope="row">${$tbody.childElementCount + 1}</th>
      <td>${$formInputValue.value}</td>
      <td>${$formInputDescription.value}</td>
      <td>${$formInputDate.value}</td>
      <td>${$formInputName.value}</td>
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
              <form>
                <div class="form-input">
                  <label class="col-form-label">Valor:</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="transaction-currency"
                    value="0,00"
                    pattern="[0-9]+,[0-9]{2}||[0-9]+(.[0-9]{3})*,[0-9]{2}"
                    required
                  />
                </div>
                <div class="form-input">
                  <label class="col-form-label">Descrição:</label>
                  <input type="text" class="form-control" value="DSAS" required />
                </div>
                <div class="form-input">
                  <label class="col-form-label">Data:</label>
                  <input type="text" class="form-control" value="DSAS" required />
                </div>
                <div class="form-input">
                  <label class="col-form-label">Nome:</label>
                  <input type="text" class="form-control" value="DSAS" required />
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
}
