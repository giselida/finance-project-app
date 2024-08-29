import illustration from "../../../assets/login-pana.svg";
import { StorageService } from "../../../components/storage/storage";
import { Toasts } from "../../../components/toasts/toast";
import { viewPassword } from "../../../functions/password/view-password";
import { generatePropertyBind } from "../../../functions/property-bind";
import { Client } from "../client";
import { Validators } from "../validation";
import html from "./login.page.html?raw";

export class LoginComponent extends HTMLElement {
  $inputName: HTMLInputElement;
  $inputPassword: HTMLInputElement;
  $buttonAdd: HTMLButtonElement;
  $seePassword: HTMLButtonElement;
  $errorMessage: HTMLElement;
  client = new Client();
  public illustration = illustration;

  connectedCallback() {
    generatePropertyBind.bind(this, html)();
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
      document.querySelector(".current-user").innerHTML = client.name;
      StorageService.setItem("client", client);
      const controls = [this.$inputName, this.$inputPassword];

      controls.forEach((input) => {
        input.dispatchEvent(new Event("input"));
      });
      const isValid = controls.every((input) => {
        return !input.validationMessage;
      });

      if (!isValid) return;

      window.location.replace("#account");
    });

    this.$seePassword.addEventListener("click", () => {
      viewPassword(this.$inputPassword);
    });
  }
}
