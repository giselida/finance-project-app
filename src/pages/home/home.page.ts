import "./home.page.scss";
export interface Cliente {
  id: number;
  name: string;
  email: string;
  accountNumber: string;
  accountAmount: number;
  password: string;
}

export class HomePage extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputEmail: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  clientList: Cliente[];
  client: Cliente;
  maxID: number = 0;
  connectedCallback() {
    this.innerHTML = /*html*/ `

<div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      Cadastrar uma conta
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
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
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      Visualizar contas
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
         <table class="table table-hover table-bordered">
  <thead class="table-warning">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Numero da conta</th>
      <th scope="col">Nome</th>
      <th scope="col">Email</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
<span class="account-info ">
  Você não possui nenhuma conta.
</span>
      </div>
    </div>
  </div>
</div>
`;
    this.onInit();
  }
  onInit() {
    this.clientList = JSON.parse(localStorage.getItem("clients")) ?? [];
    this.maxID = +localStorage.getItem("idClients");
    this.$buttonAdd = document.querySelector(".btn-add");
    const $formControls = document.querySelectorAll(".form-control");
    const [$inputName, $inputEmail, $inputPassword] = $formControls;
    this.$inputName = $inputName as HTMLInputElement;
    this.$inputEmail = $inputEmail as HTMLInputElement;
    this.$inputPassword = $inputPassword as HTMLInputElement;
    this.addListeners();
    this.renderList();
  }

  private addListeners() {
    this.sendListener();
  }

  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.$inputName.value || !this.$inputEmail.value || !this.$inputPassword.value) return;
      this.addClient();
      this.renderList();
    });
  }
  private setStorage() {
    localStorage.setItem("clients", JSON.stringify(this.clientList));
    localStorage.setItem("idClients", this.maxID.toString());
  }
  renderList() {
    if (this.clientList.length < 1) this.maxID = 0;

    const $tbody = document.querySelector("tbody");
    const $table = document.querySelector("table");
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");
    const clientLength = this.clientList.length < 1;

    $accountInfo.hidden = !clientLength;
    $table.hidden = clientLength;
    $tbody.innerHTML = "";
    this.clientList.forEach((client) => {
      $tbody.innerHTML += `
       <tr>
      <th scope="row">${client.id}</th>
      <td>${client.accountNumber}</td>
      <td>${client.name}</td>
      <td>${client.email}</td> 
      <td class="actions"> 
      <ion-icon name="bag-check-outline" class="add-account" onclick="document.querySelector('home-page').selectClient(${client.id})">
      </ion-icon>
      <ion-icon name="trash-outline" class="delete" onclick="document.querySelector('home-page').removeClient(${client.id})" >
      </ion-icon>
    
      </td> 
    </tr>
      `;
    });
  }
  removeClient(id: number) {
    this.client = JSON.parse(localStorage.getItem("client") ?? "{}");

    this.clientList = this.clientList.filter((client) => client.id !== id);
    this.setStorage();
    this.renderList();
    if (this.client.id == id) {
      localStorage.removeItem("client");
      window.location.reload();
    }
  }
  selectClient(id: number) {
    const client = this.clientList.find((client) => client.id == id);
    document.querySelector(".current-user").innerHTML = client.name;
    localStorage.setItem("client", JSON.stringify(client));
    this.connectedCallback();
  }
  cleanForms() {
    this.$inputName.value = "";
    this.$inputEmail.value = "";
    this.$inputPassword.value = "";
    this.client = null;
  }

  private addClient() {
    const random = (min: number = 1, max: number = 100) => Math.floor(Math.random() * (max - min) + min);
    const objectClient: Cliente = {
      id: ++this.maxID,
      name: this.$inputName.value,
      email: this.$inputEmail.value,
      accountNumber: `${random()}${random()}${random()}-${random()}`,
      accountAmount: 0,
      password: this.$inputPassword.value,
    };

    this.clientList.push(objectClient);
    this.setStorage();
    this.cleanForms();
  }
}
