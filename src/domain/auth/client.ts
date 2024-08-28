import { Toasts } from "../../components/toasts/toast";
import { CardClient } from "../card-account/interface/card-client";
import "./auth.scss";
import { Cliente } from "./interface/client.interface";

export class Client {
  maxID: number = 0;
  clientList: Cliente[];
  client: Cliente;
  cards: CardClient[];
  constructor() {
    this.getStorage();
  }

  private getStorage() {
    this.clientList = JSON.parse(localStorage.getItem("clients") ?? "[]");
    this.maxID = +localStorage.getItem("idClients");
    this.client = JSON.parse(localStorage.getItem("client") ?? "{}");
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
      name: $inputName.value.trim(),
      password: $inputPassword.value.trim(),
      accountNumber: `${random()}${random()}${random()}-${random()}`,
      accountAmount: 0,
      email: $inputEmail.value.trim(),
      selected: true,
      active: true,
    };

    this.clientList.push(objectClient);
    this.firstClient();
    this.setStorage();
    this.cleanForms($inputName, $inputPassword, $inputEmail, $inputConfirmPassword);
    Toasts.success("Conta criada com sucesso!");
  }

  firstClient() {
    const client = this.clientList.find((client) => client.id === this.maxID);
    this.client = client;
    if (this.clientList.length <= 1) {
      if (this.client.accountAmount == 0) this.client.accountAmount = 10000;
    }
    const list = this.clientList.filter((item) => item !== client);
    list.forEach((value) => {
      value.selected = false;
    });

    document.querySelector(".current-user").innerHTML = client.name;
    localStorage.setItem("client", JSON.stringify(client));
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
    localStorage.setItem("clients", JSON.stringify(this.clientList));
    localStorage.setItem("client", JSON.stringify(this.client));
    localStorage.setItem("idClients", this.maxID.toString());
    localStorage.setItem("idClients", this.maxID.toString());
  }

  hasClient($inputName: HTMLInputElement, $inputPassword: HTMLInputElement) {
    const client = this.clientList.find((value) => value.name === $inputName.value && value.password === $inputPassword.value);
    return client;
  }
}
