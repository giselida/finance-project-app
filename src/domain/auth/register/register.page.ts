import illustration from "../../../assets/login-pana.svg";
import { Toasts } from "../../../components/toasts/toast";
import { Validation } from "./../validation";
import "./register.page.scss";

const template = `
<div class="card register">
  <form class="was-validated">
    <div class="mb-3">
      <label class="form-label">Nome
        <div class="required">*</div>
      </label>
      <input type="text" class="form-control form" placeholder="Digite seu nome" minlength="3"   required />
    </div>
    <div class="mb-3">
      <label class="form-label">E-mail
        <div class="required">*</div>
      </label>
      <input type="text" class="form-control form" placeholder="Digite seu email" required />
    </div>
    <div class="mb-3 password">
      <label class="form-label">Senha
        <div class="required">*</div>
      </label>
      <input type="password" class="form-control form icon-eye-closed icon-eye-open" placeholder="Digite sua senha" autocomplete="off" minlength="8" required />  
      <div class="see-password"></div>
    </div>
    <div class="mb-3 password">
      <label class="form-label">Confirme sua senha
        <div class="required">*</div>
      </label>
      <input type="password" class="form-control form icon-eye-closed icon-eye-open" placeholder="Digite sua senha" autocomplete="off" minlength="8" required />  
      <div class="see-confirm-password"></div>
    </div>    
    <button class="btn btn-add" type="submit">Cadastrar</button>
  </form>
</div>
<div class="card card-illustration">
  <span class="anchor">Você ja é cadastrado, logue sua conta aqui!</span>
  <a href="#login">
    <button type="button" class="btn btn-account">
      <span class="material-symbols-outlined icon"> group_add </span>
      Entrar na conta 
    </button>
  </a>
  <img src="${illustration}" class="illustration" alt="imagem de login" />
</div>
`;

export class RegisterComponent extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $inputEmail: HTMLInputElement;
  $inputConfirmPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  $seePassword: HTMLElement;
  $seeConfirmPassword: HTMLElement;
  validation = new Validation();

  connectedCallback() {
    this.innerHTML = template;
    this.recoveryElementRef();
  }

  recoveryElementRef() {
    this.$buttonAdd = document.querySelector(".btn-add");
    const $formControls = document.querySelectorAll("form .form");
    const [$inputName, $inputEmail, $inputPassword, $inputConfirmPassword] = $formControls;
    this.$inputName = $inputName as HTMLInputElement;
    this.$inputEmail = $inputEmail as HTMLInputElement;
    this.$inputPassword = $inputPassword as HTMLInputElement;
    this.$inputConfirmPassword = $inputConfirmPassword as HTMLInputElement;
    this.$seePassword = document.querySelector(".see-password");
    this.$seeConfirmPassword = document.querySelector(".see-confirm-password");

    this.sendListener();
  }

  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.$inputName.value || !this.$inputEmail.value || !this.$inputPassword.value || !this.$inputConfirmPassword.value) {
        Toasts.error("Por favor preencha os campos obrigatórios!");
        throw new Error("Por favor preencha os campos obrigatórios!");
      }
      if (this.$inputPassword.value !== this.$inputConfirmPassword.value) {
        Toasts.error("As senhas devem ser idênticas!");
        throw new Error("As senhas devem ser idênticas!");
      }
      this.validation.addClient(this.$inputName, this.$inputPassword, this.$inputEmail, this.$inputConfirmPassword);
    });

    this.$seePassword.addEventListener("click", () => {
      this.validation.viewPassword(this.$inputPassword);
    });
    this.$seeConfirmPassword.addEventListener("click", () => {
      this.validation.viewPassword(this.$inputConfirmPassword);
    });
  }
}
