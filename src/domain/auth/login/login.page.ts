import illustration from "../../../assets/register-pana.svg";
import { Toasts } from "../../../components/toasts/toast";
import { viewPassword } from "../../../functions/password/view-password";
import { Client } from "../client";
import { Validators } from "../validation";
import "./login.page.scss";
const template = `
<div class="card login">
  <form class="was-validated">
    <div class="mb-3">
      <label class="form-label"> Nome </label>
      <input
        type="text"
        class="form-control form"
        name="name"
        minlength="3"
        placeholder="Digite seu nome"
        required
      />
      <div class="error-message"></div>
    </div>

    <div class="mb-3 password">
      <label class="form-label"> Senha </label>
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

    <button class="btn btn-add" type="button">Entrar</button>
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
  validation = new Validators();
  client = new Client();

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
    this.$inputName.addValidation([Validators.required, Validators.minLength(3), Validators.onlyCharacters]);
    this.$inputPassword.addValidation([Validators.required, Validators.password, Validators.minLength(8)]);

    this.$buttonAdd.addEventListener("click", () => {
      const client = this.client.hasClient(this.$inputName, this.$inputPassword);
      if (!client) {
        return Toasts.error("Você não possui um cadastro!");
      }
      const controls = [this.$inputName, this.$inputPassword];

      controls.forEach((input) => {
        input.dispatchEvent(new Event("input"));
      });
      const isValid = controls.every((input) => {
        return !input.validationMessage;
      });

      if (!isValid) return;

      window.location.replace("#transaction");
    });

    this.$seePassword.addEventListener("click", () => {
      viewPassword(this.$inputPassword);
    });
  }
}
