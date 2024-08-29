import { StorageService } from "../../components/storage/storage";
import { badgeUpdate } from "../../functions/notification/notification";
import { generatePropertyBind } from "../../functions/property-bind";
import { Cliente } from "../auth/interface/client.interface";
import { Transaction } from "../transaction/interface/transaction.interface";
import html from "./notification.page.html?raw";
import "./notification.page.scss";

export class Notification extends HTMLElement {
  transactionList: Transaction[] = [];

  get clientLogged(): Cliente {
    return StorageService.getItem<Cliente>("client", {} as Cliente);
  }

  get clients(): Cliente[] {
    return StorageService.getItem<Cliente[]>("clients", []);
  }

  connectedCallback() {
    this.transactionList = StorageService.getItem<Transaction[]>("transactionList", []);

    const transaction = this.transactionList.filter((value) => value.dateOfPayDay);
    generatePropertyBind.bind(this, html)();

    document.querySelectorAll(".list-group-item").forEach(($item) => {
      $item.addEventListener("click", () => {
        if (!$item.classList.contains("active")) return;
        const transactionID = $item.getAttribute("id");
        const transactionItem = this.transactionList.find((transaction) => transaction.id == +transactionID);
        if (transactionItem) {
          transactionItem.view.push(this.clientLogged.id);
          $item.classList.remove("active");
          StorageService.setItem("transactionList", this.transactionList);
          badgeUpdate();
        }
      });
      // $item.addEventListener("contextmenu", (event) => {
      //   event.preventDefault();
      // });
    });

    const $accountInfo = document.querySelector<HTMLElement>(".account-info");
    if ($accountInfo) {
      $accountInfo.style.display = transaction.length < 1 ? "block" : "none";
    }
  }
}
