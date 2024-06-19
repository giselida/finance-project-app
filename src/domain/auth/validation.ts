import { Toasts } from "../../components/toasts/toast";
import { ClientCard } from "../account-pay/account-pay.page";
import { Cliente } from "../account/account.page";

export class Validation {
  maxID: number = 0;
  clientList: Cliente[];
  client: Cliente;
  clientCard: ClientCard;
  constructor() {
    this.getStorage();
  }

  private getStorage() {
    this.clientList = JSON.parse(localStorage.getItem("clients") ?? "[]");
    this.clientCard = JSON.parse(localStorage.getItem("clientCard") ?? "{}");
    this.client = JSON.parse(localStorage.getItem("client") || "{}");
  }

  viewPassword(input: HTMLInputElement) {
    input.type = input.type === "password" ? "text" : "password";
  }

  addClient(
    $inputName: HTMLInputElement,
    $inputPassword: HTMLInputElement,
    $inputEmail?: HTMLInputElement,
    $inputConfirmPassword?: HTMLInputElement
  ) {
    const random = (min: number = 1, max: number = 100) => Math.floor(Math.random() * (max - min) + min);
    const objectClient: Cliente = {
      id: ++this.maxID,
      name: $inputName.value,
      password: $inputPassword.value,
      accountNumber: `${random()}${random()}${random()}-${random()}`,
      accountAmount: 0,
      email: $inputEmail.value,
      limitCredit: 0,
      limitCreditUsed: 0,
      limitCreditCurrent: 0,
      clientCard: [this.clientCard],
    };

    this.clientList.push(objectClient);

    this.setStorage();
    this.cleanForms($inputName, $inputPassword, $inputEmail, $inputConfirmPassword);
    Toasts.success("Conta criada com sucesso!");
    window.location.replace("#transaction");
    location.reload();
  }

  private setStorage() {
    localStorage.setItem("clients", JSON.stringify(this.clientList));
    localStorage.setItem("client", JSON.stringify(this.client));
    localStorage.setItem("idClients", this.maxID.toString());
    localStorage.setItem("clientCard", JSON.stringify(this.clientCard));
  }
  hasClient($inputName: HTMLInputElement, $inputPassword: HTMLInputElement) {
    const client = this.clientList.find((value) => value.name === $inputName.value && value.password === $inputPassword.value);
    console.log(client, "client");
    console.log(this.client, "clienteS");
    if (!client) {
      return Toasts.error("você não possui um cadastro!");
    }
    window.location.replace("#transaction");
  }
  cleanForms(
    $inputName: HTMLInputElement,
    $inputPassword: HTMLInputElement,
    $inputEmail: HTMLInputElement,
    $inputConfirmPassword: HTMLInputElement
  ) {
    $inputName.value = "";
    $inputPassword.value = "";
    $inputEmail.value = "";
    $inputConfirmPassword.value = "";
  }
}
