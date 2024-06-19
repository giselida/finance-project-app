import illustration from "../../../assets/register-pana.svg";
import { Toasts } from "../../../components/toasts/toast";
import { Validation } from "../validation";
import "./login.page.scss";
const template = `
<div class="card login">
  <form class="was-validated">
    <div class="mb-3">
      <label class="form-label"
        >Nome
        <div class="required">*</div></label
      >
      <input type="text" class="form-control form" pattern="^[A-Za-z]+$" minlength="3" maxlength="20" placeholder="Digite seu nome" required />
      <div class="error-message"></div>
    </div>

    <div class="mb-3 password" >
      <label class="form-label"
        >Senha
        <div class="required">*</div></label
      >
      <input type="password" class="form-control form icon-eye-closed icon-eye-open" placeholder="Digite sua senha" autocomplete="off"  minlength="8" required />  
 
 <div class="see-password"></div>
    </div>
   
    <button class="btn btn-add" type="submit">Entrar</button>
  </form>
</div>
<div class="card card-illustration">
  <span class="anchor">Você ainda não é cadastrado,crie sua conta aqui!</span>
   <a href="#register">
  <button type="button" class="btn btn-account">
    <span class="material-symbols-outlined icon"> group_add </span>
    Criar uma conta 
  </button>
  </a>
  <img class="illustration" src="${illustration}" alt="imagem de cadastrar" />
</div>
`;

export class LoginComponent extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  $seePassword: HTMLButtonElement;
  $errorMessage: HTMLElement;
  validation = new Validation();

  connectedCallback() {
    this.innerHTML = template;
    this.recoveryElementRef();
  }
  recoveryElementRef() {
    this.$buttonAdd = document.querySelector(".btn-add");
    this.$seePassword = document.querySelector(".see-password");
    this.$errorMessage = document.querySelector(".error-message");
    const $formControls = document.querySelectorAll("form .form");
    const [$inputName, $inputPassword] = $formControls;
    this.$inputName = $inputName as HTMLInputElement;
    this.$inputPassword = $inputPassword as HTMLInputElement;

    this.sendListener();
  }
  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.$inputName.value || !this.$inputPassword.value) {
        Toasts.error("Por favor preencha os campos obrigatórios!");
        throw new Error("Por favor preencha os campos obrigatórios!");
      }
      this.validation.hasClient(this.$inputName, this.$inputPassword);
    });
    this.$seePassword.addEventListener("click", () => {
      this.validation.viewPassword(this.$inputPassword);
    });
  }
}
