import "./account.page.scss";
interface Cliente {
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
  connectedCallback() {
    this.innerHTML = /*html*/ `
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
`;
    this.onInit();
  }
  onInit() {
    this.clientList = JSON.parse(localStorage.getItem("clients")) ?? [];

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
  }

  cleanForms() {
    this.$inputName.value = "";
    this.$inputEmail.value = "";
    this.$inputPassword.value = "";
  }

  private addClient() {
    const objectClient: Cliente = {
      name: this.$inputName.value,
      email: this.$inputEmail.value,
      password: this.$inputPassword.value,
    };

    this.clientList.push(objectClient);
    console.log(this.clientList);
  }
}
