import { StorageService } from "../../components/storage/storage";
import { Toasts } from "../../components/toasts/toast";
import "./auth.scss";
import { Cliente } from "./interface/client.interface";

export class Client {
  maxID: number = 0;
  clientList: Cliente[] = [];
  client: Cliente;

  constructor() {
    this.getStorage();
  }

  private getStorage(): void {
    this.clientList = StorageService.getItem<Cliente[]>("clients", []);
    this.maxID = +StorageService.getItem<number>("idClients", 0);
    this.client = StorageService.getItem<Cliente>("client", {} as Cliente);
  }

  addClient(
    $inputName: HTMLInputElement,
    $inputPassword: HTMLInputElement,
    $inputEmail: HTMLInputElement,
    $inputConfirmPassword: HTMLInputElement
  ): void {
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

  firstClient(): void {
    const client = this.clientList.find((client) => client.id === this.maxID);
    if (client) {
      this.client = client;
      if (this.clientList.length <= 1 && this.client.accountAmount === 0) {
        this.client.accountAmount = 10000;
      }
      const list = this.clientList.filter((item) => item !== client);
      list.forEach((value) => {
        value.selected = false;
      });

      document.querySelector(".current-user").innerHTML = client.name;
      StorageService.setItem("client", client);
    }
  }

  cleanForms(
    $inputName: HTMLInputElement,
    $inputPassword: HTMLInputElement,
    $inputEmail: HTMLInputElement,
    $inputConfirmPassword: HTMLInputElement
  ): void {
    $inputName.value = "";
    $inputPassword.value = "";
    $inputEmail.value = "";
    $inputConfirmPassword.value = "";
  }

  private setStorage(): void {
    StorageService.setItem("clients", this.clientList);
    StorageService.setItem("client", this.client);
    StorageService.setItem("idClients", this.maxID);
  }

  hasClient($inputName: HTMLInputElement, $inputPassword: HTMLInputElement): Cliente | undefined {
    return this.clientList.find((value) => value.name === $inputName.value && value.password === $inputPassword.value);
  }
}
