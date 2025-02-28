import { Carousel } from "../../components/carousel/carousel";
import { StorageService } from "../../components/storage/storage";
import { InvoiceStatus, invoiceStatusOptions } from "../../constants/invoice-status.options";
import { descriptionOptions, SVG_ICONS_DESCRIPTION } from "../../constants/svg-icons-description";
import { eFormOfPayment } from "../../constants/svg-icons-form-payment";
import { generatePropertyBind } from "../../functions/property-bind";
import { Cliente } from "../auth/interface/client.interface";
import { Invoice } from "../invoice-of-card/interface/invoice";
import { Transaction } from "../transaction/interface/transaction.interface";

import html from "./payment-of-card.page.html?raw";
import "./payment-of-card.page.scss";
export class PaymentOfCardPage extends HTMLElement {
  SVG_ICONS_DESCRIPTION = SVG_ICONS_DESCRIPTION;
  descriptionOptions = descriptionOptions;
  invoiceStatusOptions = invoiceStatusOptions;
  private isHistoryVisible = false;
  $btnAdd: HTMLButtonElement;
  $historyContainer: HTMLElement;
  transactionList: Transaction[];
  invoice: Invoice;
  listOfInvoices: Invoice[];
  client: Cliente;
  carousel: Carousel;

  $container: HTMLElement;

  connectedCallback() {
    this.transactionList = StorageService.getItem<Transaction[]>("transactionList", []);
    this.invoice = StorageService.getItem<Invoice>("invoice", {} as Invoice);
    this.listOfInvoices = StorageService.getItem<Invoice[]>("listOfInvoices", []);
    this.client = StorageService.getItem<Cliente>("client", {} as Cliente);

    generatePropertyBind.bind(this, html)();
    this.recoveryElementRef();
    this.carousel = new Carousel(".card-container", ".previous", ".next");
  }
  recoveryElementRef() {
    this.$btnAdd = document.querySelector(".btn-history");
    this.$historyContainer = document.querySelector(".payment-history");
    this.$container = document.querySelector(".invoice-container");

    this.addListeners();
    this.renderHistory();
    this.renderInvoices();
  }

  addListeners() {
    this.$btnAdd.addEventListener("click", () => this.toggleHistory(this.$historyContainer));
  }

  toggleHistory(historyContainer: HTMLElement) {
    this.isHistoryVisible = !this.isHistoryVisible;
    historyContainer.classList.toggle("visible", this.isHistoryVisible);
  }
  renderInvoices() {
    this.$container.innerHTML = "";

    const invoices = this.listOfInvoices.filter((invoice) => invoice.status !== InvoiceStatus.PAGA);

    let invoicesHtml = "";
    console.log(invoices);
    invoices.forEach((invoice) => {
      const monthYear = invoice.date
        .convertStringDate()
        .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
        .capitalizeFirstLetter();
      const month = invoice.date.convertStringDate().toLocaleDateString("pt-BR", { month: "long" }).capitalizeFirstLetter();
      const statusName = this.invoiceStatusOptions.find((value) => value.id === invoice.status)?.name;
      invoicesHtml += ` 
      <div class="card text-center" style="width: 250px" data-invoice-id="${invoice.id}">
         <div class="card-header">${month} <span class="status-${statusName.toLowerCase()}">${statusName}</span> </div>
         <div class="card-body">
           <h5 class="card-title">${monthYear}</h5>
           <h5 class="card-title">${invoice.value.formatToBRL()}</h5>
         </div>
         <div class="card-footer text-body-secondary">
           Vencimento 
           ${invoice.date.convertStringDate().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
         </div>
       </div>`;
    });

    this.$container.innerHTML = invoicesHtml;

    // Adicionando o evento de clique diretamente no código
    this.$container.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", (event) => {
        const invoiceId = (event.currentTarget as HTMLElement).getAttribute("data-invoice-id");

        if (invoiceId) {
          this.selectClient(+invoiceId);
        }
      });
    });
  }

  selectClient(id: number) {
    const invoice = this.listOfInvoices.find((inv) => inv.id === id);

    if (invoice) {
      console.log("Fatura selecionada:", invoice);
      this.invoice = invoice;

      StorageService.setItem("invoice", invoice);

      this.connectedCallback();
    }
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
