import illustration from "../../../assets/register-pana.svg";
import { Toasts } from "../../../components/toasts/toast";
import { viewPassword } from "../../../functions/password/view-password";
import { generatePropertyBind } from "../../../functions/property-bind";
import { Client } from "../client";
import { Validators } from "../validation";
import html from "./register.page.html?raw";

export class RegisterComponent extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $inputEmail: HTMLInputElement;
  $inputConfirmPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  $seePassword: HTMLElement;
  $seeConfirmPassword: HTMLElement;
  $errorMessage: HTMLElement;
  public illustration = illustration;
  client = new Client();
  connectedCallback() {
    generatePropertyBind.bind(this, html)();
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
    this.$inputName.addValidation([Validators.required, Validators.onlyCharacters, Validators.lengthValidator("min", 3)]);
    this.$inputEmail.addValidation([Validators.required, Validators.email]);
    this.$inputPassword.addValidation([
      Validators.required,
      Validators.password,
      Validators.lengthValidator("min", 8),
      Validators.lengthValidator("max", 8),
    ]);
    this.$inputConfirmPassword.addValidation([
      Validators.required,
      Validators.password,
      Validators.passwordMatch(this.$inputPassword),
      Validators.lengthValidator("min", 8),
      Validators.lengthValidator("max", 8),
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
