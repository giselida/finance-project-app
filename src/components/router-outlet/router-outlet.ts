import { AccountPage } from "../../domain/account/account.page";
import { LoginComponent } from "../../domain/auth/login/login.page";
import { RegisterComponent } from "../../domain/auth/register/register.page";
import { CardAccountPage } from "../../domain/card-account/card-account.page";
import { ConversionPage } from "../../domain/conversion/conversion.page";
import { Notification } from "../../domain/notification/notification.page";
import { TransactionPage } from "../../domain/transaction/transaction.page";
import { badgeUpdate } from "../../functions/notification/notification";

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
};

const client = JSON.parse(localStorage.getItem("client") || "{}");

const template = `
<header>
  <div class="content">
    <span class="material-symbols-outlined menu"> menu </span>
    <span class="page-title"></span>
  </div>    

  <div class="header">
      <a href="#notifications" title="Notificações">
          <div class="notification">
            <span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"></span>
            <span class="material-symbols-outlined"> notifications </span>
          </div>
      </a>

  <div class="dropdown">

    <div class="user account">
      <span class="material-symbols-outlined"> account_circle </span>
      <span class="current-user" title="${client.name}">${client.name ?? ""}</span>
    </div>

    <div class="account-menu dropdown-menu">
      <a href="#account" title="Conta">
        <div class="option-menu dropdown-item">
          <span class="material-symbols-outlined"> person </span>
          Conta
        </div>
      </a>
    </div>

  </div>
      <a href="#login" title="sair">
        <div class="log-out">
          <span class="material-symbols-outlined">
          logout
          </span>
        </div>
     </a>
  </div>
</header>
    <nav class="side-nav">
      <a href="#transaction" class="anchors" title="Transação">
         ${PAGE_TITLES["#transaction"]}
      </a>
      <a href="#conversion" class="anchors" title="Conversor">
        ${PAGE_TITLES["#conversion"]}
      </a>
      <a href="#cardAccount" class="anchors" title="Pagamento">
        ${PAGE_TITLES["#cardAccount"]}
      </a>
     
    </nav>
    <main id="root"></main>
    <div id="toast-content"></div>
      `;

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

  connectedCallback() {
    this.createInnerHTML();
    this.recoveryElementRef();
    if (!window.location.hash) window.location.replace("#login");
    this.renderContent();
    this.onInit();
  }
  private createInnerHTML() {
    this.innerHTML = template;
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
      "#account": AccountPage,
      "#transaction": TransactionPage,
      "#notifications": Notification,
      "#conversion": ConversionPage,
      "#cardAccount": CardAccountPage,
      "#login": LoginComponent,
      "#register": RegisterComponent,
    };

    this.$anchor.forEach((anchor) => {
      anchor.classList.remove("active-router");
    });

    document.querySelector(`a[href="${hash}"]`)?.classList.add("active-router");
    this.$pageTitle.innerHTML = PAGE_TITLES[hash];

    if (hash === "#login" || hash === "#register") {
      this.$header.classList.add("disabled");
      this.$nav.classList.add("disabled");
    } else {
      this.$header.classList.remove("disabled");
      this.$nav.classList.remove("disabled");
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
