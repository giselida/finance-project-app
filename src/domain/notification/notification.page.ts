import { badgeUpdate } from "../../functions/notification/notification";
import { generatePropertyBind } from "../../functions/property-bind";
import { Cliente } from "../auth/interface/client.interface";
import { Transaction } from "../transaction/interface/transaction.interface";
import html from "./notification.page.html?raw";
import "./notification.page.scss";
export class Notification extends HTMLElement {
  transactionList: Transaction[];

  get clientLogged(): Cliente {
    return JSON.parse(localStorage.getItem("client") ?? "{}");
  }

  get clients(): Cliente[] {
    return JSON.parse(localStorage.getItem("clients") ?? "[]");
  }
  connectedCallback() {
    this.transactionList = JSON.parse(localStorage.getItem("transactionList") ?? "[]");
    const transaction = this.transactionList.filter((value) => value.dateOfPayDay);
    generatePropertyBind.bind(this, html)();

    document.querySelectorAll(".list-group-item").forEach(($item) => {
      $item.addEventListener("click", () => {
        if (!$item.classList.contains("active")) return;
        const transactionID = $item.getAttribute("id");
        this.transactionList.find((transaction) => transaction.id == +transactionID).view.push(this.clientLogged.id);
        $item.classList.remove("active");
        localStorage.setItem("transactionList", JSON.stringify(this.transactionList));
        badgeUpdate();
      });
      // $item.addEventListener("contextmenu", (event) => {
      //   event.preventDefault();
      // });
    });
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");
    $accountInfo.style.display = transaction.length < 1 ? "block" : "none";
  }
}
