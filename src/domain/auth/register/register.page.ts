import illustration from "../../../assets/login-pana.svg";
import { Toasts } from "../../../components/toasts/toast";
import { viewPassword } from "../../../functions/password/view-password";
import { Client } from "../client";
import { Validators } from "../validation";
import "./register.page.scss";

const template = `
<div class="card register">
  <form class="was-validated">
    <div class="mb-3">
      <label class="form-label"
        >Nome
      </label>
      <input 
      type="text" 
      class="form-control form" name="name" 
      placeholder="Digite seu nome"
      minlength="3"
      required />
      <div class="error-message"></div>
    </div>
    <div class="mb-3">
      <label class="form-label">
      E-mail
      </label>
      <input type="email" class="form-control form" name="email" placeholder="Digite seu email" required />
      <div class="error-message"></div>
    </div>
    <div class="mb-3 password">
      <label class="form-label"
        >Senha
      </label>
      <input
        type="password"
        class="form-control form icon-eye-closed icon-eye-open"
        name="password"
        placeholder="Digite sua senha"
        autocomplete="off"
        minlength="8"
        required
      />
      <div class="see-password"></div>
      <div class="error-message"></div>
    </div>
    <div class="mb-3 password">
      <label class="form-label"
        >Confirme sua senha
      </label>
      <input
        type="password"
        class="form-control form icon-eye-closed icon-eye-open"
        placeholder="Digite sua senha"
        name="confirmPassword"
        autocomplete="off"
        minlength="8"
        required
      />
      <div class="see-confirm-password"></div>
      <div class="error-message"></div>
    </div>
    <button class="btn btn-add" type="button">Cadastrar</button>
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
  $errorMessage: HTMLElement;

  client = new Client();

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

    this.sendListener();
  }

  private sendListener() {
    this.$inputName.addValidation([Validators.required, Validators.onlyCharacters, Validators.minLength(3)]);
    this.$inputEmail.addValidation([Validators.required, Validators.email]);
    this.$inputPassword.addValidation([Validators.required, Validators.password]);
    this.$inputConfirmPassword.addValidation([
      Validators.required,
      Validators.password,
      Validators.passwordMatch(this.$inputPassword),
      Validators.minLength(8),
    ]);

    this.$inputPassword.addEventListener("input", () => {
      if (this.$inputConfirmPassword.value) this.$inputConfirmPassword.dispatchEvent(new Event("input"));
    });

    this.$errorMessage = document.querySelector(".error-message");

    this.$seePassword = document.querySelector(".see-password");
    this.$seeConfirmPassword = document.querySelector(".see-confirm-password");

    this.$seePassword.addEventListener("click", () => {
      viewPassword(this.$inputPassword);
    });
    this.$seeConfirmPassword.addEventListener("click", () => {
      viewPassword(this.$inputConfirmPassword);
    });
    this.$buttonAdd.addEventListener("click", () => {
      const controls = [this.$inputName, this.$inputPassword, this.$inputEmail, this.$inputConfirmPassword];

      controls.forEach((input) => {
        input.dispatchEvent(new Event("input"));
      });
      const isValid = controls.every((input) => {
        return !input.validationMessage;
      });

      if (!isValid) return;

      const client = this.client.hasClient(this.$inputName, this.$inputPassword);

      if (client) {
        return Toasts.error("Você já possui um cadastro!");
      }

      this.client.addClient(this.$inputName, this.$inputPassword, this.$inputEmail, this.$inputConfirmPassword);
      window.location.replace("#account");
    });
  }
}
