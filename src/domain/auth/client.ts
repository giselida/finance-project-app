import { Toasts } from "../../components/toasts/toast";
import { Cliente } from "../account/interface/client.interface";
import { CardClient } from "../card-account/interface/card-client";

export class Client {
  maxID: number = 0;
  list: Cliente[];
  actual: Cliente;
  cards: CardClient[];
  constructor() {
    this.getStorage();
  }

  private getStorage() {
    this.list = JSON.parse(localStorage.getItem("clients") ?? "[]");
    this.cards = JSON.parse(localStorage.getItem("listOfCards") ?? "[]");
    this.maxID = +localStorage.getItem("idClients");
    this.actual = JSON.parse(localStorage.getItem("client") || "{}");
  }
  addClient(
    $inputName: HTMLInputElement,
    $inputPassword: HTMLInputElement,
    $inputEmail: HTMLInputElement,
    $inputConfirmPassword: HTMLInputElement
  ) {
    const random = (min: number = 1, max: number = 100) => Math.floor(Math.random() * (max - min) + min);
    const objectClient: Cliente = {
      id: ++this.maxID,
      name: $inputName.value,
      password: $inputPassword.value,
      accountNumber: `${random()}${random()}${random()}-${random()}`,
      accountAmount: 0,
      email: $inputEmail.value,
    };

    this.list.push(objectClient);

    this.setStorage();
    this.cleanForms($inputName, $inputPassword, $inputEmail, $inputConfirmPassword);
    Toasts.success("Conta criada com sucesso!");
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

  private setStorage() {
    localStorage.setItem("clients", JSON.stringify(this.list));
    localStorage.setItem("client", JSON.stringify(this.actual));
    localStorage.setItem("idClients", this.maxID.toString());
    localStorage.setItem("listOfCards", JSON.stringify(this.cards));
    localStorage.setItem("idClients", this.maxID.toString());
  }

  hasClient($inputName: HTMLInputElement, $inputPassword: HTMLInputElement) {
    const client = this.list.find((value) => value.name === $inputName.value && value.password === $inputPassword.value);
    return client;
  }
}
