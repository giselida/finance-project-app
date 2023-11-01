import "./account.page.scss";
interface Cliente {
  id: number;
  name: string;
  email: string;
  password: string;
}
export class AccountPage extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputEmail: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  clientList: Cliente[];
  idClient: number = 0;
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <div class="card mb-2">
  <div class="card-header">
    Conta selecionada
  </div>
  <div class="card-body">
    <h5 class="card-title">João Vitor</h5>
    <h5 class="card-title">Numero da conta: 3456-785</h5>
    <p class="card-text">Saldo: R$ 2455</p>
  </div>
</div>
<div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      Visualizar contas
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
 
    </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      Cadastrar uma conta
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <form class="was-validated">
        <div class="mb-3">
          <label class="form-label">Nome</label>
          <input type="text" class="form-control"  required>
        </div>
        <div class="mb-3">
          <label  class="form-label">E-mail</label>
          <input type="text" class="form-control" required >
        </div>
        <div class="mb-3">
          <label  class="form-label">Senha</label>
      <input type="password" class="form-control" required>
        </div>
        <div lass="mb-3">
          <button class="btn btn-add" type="submit">Salvar</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</div>
`;
    this.onInit();
  }
  onInit() {
    this.clientList = JSON.parse(localStorage.getItem("clients")) ?? [];
    this.idClient = +localStorage.getItem("idClients");
    this.$buttonAdd = document.querySelector(".btn-add");
    const $formControls = document.querySelectorAll(".form-control");
    const [$inputName, $inputEmail, $inputPassword] = $formControls;
    this.$inputName = $inputName as HTMLInputElement;
    this.$inputEmail = $inputEmail as HTMLInputElement;
    this.$inputPassword = $inputPassword as HTMLInputElement;
    this.addListeners();
  }

  private addListeners() {
    this.sendListener();
  }

  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.$inputName.value || !this.$inputEmail.value || !this.$inputPassword.value) return;
      this.addClient();
      this.setStorage();
      this.cleanForms();
    });
  }
  private setStorage() {
    localStorage.setItem("clients", JSON.stringify(this.clientList));
    localStorage.setItem("idClients", this.idClient.toString());
  }

  cleanForms() {
    this.$inputName.value = "";
    this.$inputEmail.value = "";
    this.$inputPassword.value = "";
  }

  private addClient() {
    const objectClient: Cliente = {
      id: ++this.idClient,
      name: this.$inputName.value,
      email: this.$inputEmail.value,
      password: this.$inputPassword.value,
    };

    this.clientList.push(objectClient);
    this.setStorage();
    this.cleanForms();
  }
}
