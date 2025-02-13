import { StorageService } from "../../components/storage/storage";
import { descriptionOptions } from "../../constants/options-description";
import { eDescription, SVG_ICONS_DESCRIPTION } from "../../constants/svg-icons-description";
import { eFormOfPayment } from "../../constants/svg-icons-form-payment";
import { generatePropertyBind } from "../../functions/property-bind";
import { Transaction } from "../transaction/interface/transaction.interface";

import html from "./payment-of-card.page.html?raw";
import "./payment-of-card.page.scss";
export class PaymentOfCardPage extends HTMLElement {
  public SVG_ICONS_DESCRIPTION = SVG_ICONS_DESCRIPTION;
  public descriptionOptions = descriptionOptions;
  public eDescription = eDescription;
  private isHistoryVisible = false;
  $btnAdd: HTMLButtonElement;
  $historyContainer: HTMLElement;
  transactionList: Transaction[];

  connectedCallback() {
    this.transactionList = StorageService.getItem<Transaction[]>("transactionList", []);
    generatePropertyBind.bind(this, html)();
    this.recoveryElementRef();
  }
  recoveryElementRef() {
    this.$btnAdd = document.querySelector(".btn-history");
    this.$historyContainer = document.querySelector(".payment-history");

    this.addListeners();
    this.renderHistory();
  }

  addListeners() {
    this.$btnAdd.addEventListener("click", () => this.toggleHistory(this.$historyContainer));
  }

  toggleHistory(historyContainer: HTMLElement) {
    this.isHistoryVisible = !this.isHistoryVisible;
    historyContainer.classList.toggle("visible", this.isHistoryVisible);
  }
  renderHistory() {
    this.$historyContainer.innerHTML = "";

    const transactionsByMonth = this.transactionList
      .filter((transaction) => transaction.idFormOfPayment === eFormOfPayment.CREDITO)
      .sort((a, b) => b.id - a.id)
      .reduce((acc, transaction) => {
        const date = transaction.date;
        const monthYear = date.convertStringDate().toLocaleString("pt-BR", { month: "long" });

        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(transaction);
        return acc;
      }, {} as Record<string, Transaction[]>);

    let transactionsHtml = "";

    Object.keys(transactionsByMonth).forEach((monthYear) => {
      transactionsHtml += `
      <div class="month-divider">${monthYear.toUpperCase()}</div>
    `;

      transactionsByMonth[monthYear].forEach((transaction) => {
        transactionsHtml += `
        <div class="payment-item">
          <div class="row-content">
            <div class="icon">${this.SVG_ICONS_DESCRIPTION[transaction.idDescription]}</div>
            <span class="description">${this.descriptionOptions.find((option) => option.id === transaction.idDescription)?.name}</span>
          </div>
          <div class="details">
            <span class="date">${transaction.date
              .convertStringDate()
              .toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</span>
            <div class="amount">R$ ${transaction.value.toFixed(2)}</div>
          </div>
        </div>
      `;
      });
    });

    this.$historyContainer.innerHTML = transactionsHtml;
  }
}
