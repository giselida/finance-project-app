import "./about.page.scss";
export class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = createInnerHTML();

    function createInnerHTML() {
      return /*html*/ `
   <button type="button" class="btn btn-transaction" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Fazer uma transação
</button>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Transação</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  </div>
</div>
    `;
    }
  }
}
