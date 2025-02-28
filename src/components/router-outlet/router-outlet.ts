import { AccountPage } from "../../domain/account/account.page";
import { Cliente } from "../../domain/auth/interface/client.interface";
import { LoginComponent } from "../../domain/auth/login/login.page";
import { RegisterComponent } from "../../domain/auth/register/register.page";
import { CardAccountPage } from "../../domain/card-account/card-account.page";
import { ConversionPage } from "../../domain/conversion/conversion.page";
import { InvoiceOfCardPage } from "../../domain/invoice-of-card/invoice-of-card.page";
import { Notification } from "../../domain/notification/notification.page";
import { PaymentOfCardPage } from "../../domain/payment-of-card/payment-of-card.page";
import { TransactionPage } from "../../domain/transaction/transaction.page";
import { badgeUpdate } from "../../functions/notification/notification";
import { generatePropertyBind } from "../../functions/property-bind";
import { StorageService } from "../storage/storage";
import html from "./router-outlet.html?raw";
const createMaterialSymbol = (iconName: string, label: string) => {
  return `
      <span class="material-symbols-outlined">
       ${iconName} 
       </span>
      <span>
      ${label}
      </span>`;
};

const PAGE_TITLES: { [key: string]: string } = {
  "#transaction": createMaterialSymbol("price_change", "Transação"),
  "#account": createMaterialSymbol("account_circle", "Conta"),
  "#notifications": createMaterialSymbol("notifications", "Notificações"),
  "#conversion": createMaterialSymbol("currency_exchange", "Conversor"),
  "#cardAccount": createMaterialSymbol("credit_score", "Cartão de crédito"),
  "#login": createMaterialSymbol("", ""),
  "#register": createMaterialSymbol("", ""),
  "#invoiceOfCard": createMaterialSymbol("payments", "Fatura"),
  "#paymentOfCard": createMaterialSymbol("payments", "Pagamento do Cartão"),
};

const client = StorageService.getItem<Cliente>("client", {} as Cliente);

export class RouterOutlet extends HTMLElement {
  $root: HTMLElement;
  $pageTitle: HTMLElement;
  $header: HTMLElement;
  $nav: HTMLElement;
  $menu: HTMLElement;
  $anchor: NodeListOf<HTMLAnchorElement>;
  $iconHeader: HTMLElement;
  $sideNav: HTMLElement;
  $anchors: NodeListOf<HTMLAnchorElement>;
  $iconAccount: HTMLElement;
  $accountMenu: HTMLElement;
  $optionMenu: NodeListOf<Element>;
  public PAGE_TITLES = PAGE_TITLES;
  public client = client;
  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
    if (!window.location.hash) window.location.replace("#login");
    this.renderContent();
    this.onInit();
  }
  private createInnerHTML() {
    generatePropertyBind.bind(this, html)();
  }

  renderContent() {
    window.addEventListener("load", () => this.renderOutlet());
    window.addEventListener("hashchange", () => this.renderOutlet());
  }
  recoveryElementRef() {
    this.$root = document.querySelector("#root");
    this.$pageTitle = document.querySelector(".page-title");
    this.$header = document.querySelector("header");
    this.$nav = document.querySelector("nav");
    this.$menu = document.querySelector(".dropdown-menu");
    this.$anchor = document.querySelectorAll("a");
    this.$iconHeader = document.querySelector("header .menu");
    this.$sideNav = document.querySelector("router-app .side-nav");
    this.$anchors = document.querySelectorAll(".anchors");
    this.$iconAccount = document.querySelector("header .account");
    this.$accountMenu = document.querySelector("header .account-menu");
    this.$optionMenu = document.querySelectorAll(".option-menu");
    this.sendListener();
  }

  sendListener() {
    this.$menu?.addEventListener("mouseleave", () => {
      this.$menu.classList.remove("active");
    });
  }

  private renderOutlet() {
    badgeUpdate();

    const hash = window.location.hash;
    const ROUTES: { [key: string]: typeof HTMLElement } = {
      "#login": LoginComponent,
      "#register": RegisterComponent,
      "#account": AccountPage,
      "#transaction": TransactionPage,
      "#notifications": Notification,
      "#conversion": ConversionPage,
      "#cardAccount": CardAccountPage,
      "#invoiceOfCard": InvoiceOfCardPage,
      "#paymentOfCard": PaymentOfCardPage,
    };

    this.$anchor.forEach((anchor) => {
      anchor.classList.remove("active-router");
    });

    document.querySelector(`a[href="${hash}"]`)?.classList.add("active-router");
    this.$pageTitle.innerHTML = PAGE_TITLES[hash];

    if (hash === "#login" || hash === "#register") {
      this.$header.classList.add("invisible");
      this.$nav.classList.add("invisible");
    } else {
      this.$header.classList.remove("invisible");
      this.$nav.classList.remove("invisible");
    }

    if (this.$root) this.$root.innerHTML = "";
    const Page = ROUTES[hash];
    if (Page) {
      const page = new Page();
      this.$root?.append(page);
    }
  }

  onInit() {
    this.activeSideBar();
    this.activeAccount();
  }

  activeSideBar() {
    this.$iconHeader?.addEventListener("click", (event) => {
      event.stopPropagation();
      this.$sideNav?.classList.toggle("active");
    });
    this.$anchors.forEach(($anchor) => {
      $anchor.addEventListener("click", (event) => {
        event.stopPropagation();
        this.$sideNav?.classList.remove("active");
      });
    });
  }

  activeAccount() {
    this.$iconAccount.addEventListener("click", () => {
      this.$accountMenu.classList.toggle("active");
      this.$optionMenu.forEach((element) => {
        element.addEventListener("click", () => {
          this.$accountMenu.classList.remove("active");
        });
      });
    });
  }
}
