import { StorageService } from "../../components/storage/storage";
import { SVG_ICONS_DESCRIPTION, descriptionOptions, eDescription } from "../../constants/svg-icons-description";
import { generatePropertyBind } from "../../functions/property-bind";
import { Cliente } from "../auth/interface/client.interface";
import { Transaction } from "../transaction/interface/transaction.interface";
import { Invoice } from "./interface/invoice";
import html from "./invoice-of-card.page.html?raw";
import "./invoice-of-card.page.scss";
export class InvoiceOfCardPage extends HTMLElement {
  public SVG_ICONS_DESCRIPTION = SVG_ICONS_DESCRIPTION;
  public descriptionOptions = descriptionOptions;
  public eDescription = eDescription;
  $btnAdd: HTMLButtonElement;
  $historyContainer: HTMLElement;
  transactionList: Transaction[];
  invoice: Invoice;
  client: Cliente;

  connectedCallback() {
    this.transactionList = StorageService.getItem<Transaction[]>("transactionList", []);
    this.client = StorageService.getItem<Cliente>("client", {} as Cliente);
    this.invoice = StorageService.getItem<Invoice>("invoice", {} as Invoice);
    generatePropertyBind.bind(this, html)();
    this.recoveryElementRef();
  }
  recoveryElementRef() {
    this.$btnAdd = document.querySelector(".btn-history");
    this.$historyContainer = document.querySelector(".payment-history");

    this.renderHistory();
  }

  renderHistory() {
    this.$historyContainer.innerHTML = "";

    // Get transactions that match the invoice's transaction IDs
    const invoiceTransactions = this.transactionList
      .filter((transaction) => this.invoice.transactions.includes(transaction.id))
      .sort((a, b) => b.id - a.id);

    const transactionsByMonth = invoiceTransactions.reduce((acc, transaction) => {
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
                    <span class="description">${
                      this.descriptionOptions.find((option) => option.id === transaction.idDescription)?.name
                    }</span>
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
