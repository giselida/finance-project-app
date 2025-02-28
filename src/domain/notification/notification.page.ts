import { StorageService } from "../../components/storage/storage";
import { badgeUpdate } from "../../functions/notification/notification";
import { generatePropertyBind } from "../../functions/property-bind";
import { Cliente } from "../auth/interface/client.interface";
import { Transaction } from "../transaction/interface/transaction.interface";
import html from "./notification.page.html?raw";
import "./notification.page.scss";

export class Notification extends HTMLElement {
  transactionList: Transaction[] = [];
  transaction: Transaction;
  $listGroupItem: NodeListOf<HTMLElement>;
  $accountInfo: HTMLElement;
  $menu: HTMLElement;
  $showActive: HTMLElement;

  get clientLogged(): Cliente {
    return StorageService.getItem<Cliente>("client", {} as Cliente);
  }

  get clients(): Cliente[] {
    return StorageService.getItem<Cliente[]>("clients", []);
  }
  recoveryElementRef() {
    this.$listGroupItem = document.querySelectorAll(".list-group-item");
    this.$accountInfo = document.querySelector(".account-info");
    this.$menu = document.querySelector(".menu-notification");
    this.$showActive = document.querySelector(".show-active");
  }

  connectedCallback() {
    this.transactionList = StorageService.getItem<Transaction[]>("transactionList", []);
    this.transaction = StorageService.getItem<Transaction>("transaction", {} as Transaction);
    const transaction = this.transactionList.filter((value) => value.dateOfPayDay);

    generatePropertyBind.bind(this, html)();
    this.recoveryElementRef();

    this.$listGroupItem.forEach(($item) => {
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
      this.showContextMenu($item);

      document.addEventListener("click", (event: MouseEvent) => {
        if (event.target !== this.$menu) {
          this.$menu.style.display = "none";
        }
      });
    });

    if (this.$accountInfo) {
      this.$accountInfo.style.display = transaction.length < 1 ? "block" : "none";
    }
  }

  private showContextMenu($item: HTMLElement) {
    $item.addEventListener("contextmenu", (event) => {
      const mouseEvent = event;
      mouseEvent.preventDefault();
      this.$menu.style.top = `${mouseEvent.pageY}px`;
      this.$menu.style.left = `${mouseEvent.pageX}px`;
      this.$menu.style.display = "block";
      this.$showActive.addEventListener("click", () => this.markAsRead($item));
    });
  }
  markAsRead($item: Element) {
    const transactionID = $item.getAttribute("id");
    const transactionItem = this.transactionList.find((transaction) => transaction.id == +transactionID);
    if (transactionItem) {
      const viewList = transactionItem.view.filter((item) => item !== +transactionID);
      transactionItem.view = viewList;
      $item.classList.add("active");
      StorageService.setItem("transactionList", this.transactionList);
      badgeUpdate();
    }
  }
}
