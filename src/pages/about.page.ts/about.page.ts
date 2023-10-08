import "./about.page.scss";
export class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.createInnerHTML();
  }
  createInnerHTML() {
    return /*html*/ `
   <button type="button" class="btn btn-transaction" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  <span class="material-symbols-outlined icon">
forward
</span>Fazer uma transação
</button>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
           <input
        type="text"
        class="form-control"
        required
      />
          </div>
 <div class="form-input">
            <label class="col-form-label">Data:</label>
           <input
        type="text"
        class="form-control"
        required
      />
          </div>
 <div class="form-input">
            <label class="col-form-label">Nome:</label>
           <input
        type="text"
        class="form-control"
        required
      />
          </div>

   </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-closed" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-send">Enviar</button>
      </div>
    </div>
  </div>
</div>
    `;
  }
}
