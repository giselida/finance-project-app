import { badgeUpdate } from "../../functions/notification";
import { AccountPage } from "../../pages/account/account.page";
import { ConversionPage } from "../../pages/conversion/conversion.page";
import { Notification } from "../../pages/notification/notification.page";
import { TransactionPage } from "../../pages/transaction/transaction.page";
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
};
export class RouterOutlet extends HTMLElement {
  connectedCallback() {
    this.createInnerHTML();
    if (!window.location.hash) window.location.replace("#transaction");
    this.renderContent();
    this.onInit();
  }
  private createInnerHTML() {
    const client = JSON.parse(localStorage.getItem("client") ?? "{}");

    this.innerHTML = /*html*/ `
<header>
  <div class="content">
    <span class="material-symbols-outlined menu"> menu </span>
    <span class="page-title"></span>
  </div>    
  <div class="header">
          <a href="#notifications" title="Notificações">
          <div class="notification">
              <span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
              </span>
            <span class="material-symbols-outlined"> notifications </span>
          </div>
      </a>
  <div class="dropdown">
    <div class="user account">
      <span class="material-symbols-outlined"> account_circle </span>
      <span class="current-user" title="${client.name}">${client.name ?? ""}</span>
    </div>
    <div class="account-menu dropdown-menu">
      <a href="#account">
        <div class="option-menu dropdown-item">
          <span class="material-symbols-outlined"> person </span>
          Conta
        </div>
      </a>
      
    
    </div>
  </div>
  </div>
</header>
    <div class="side-bar">
      <a href="#transaction" class="anchors" title="Transação">
         ${PAGE_TITLES["#transaction"]}
      </a>
      <a href="#conversion" class="anchors" title="Conversor">
        ${PAGE_TITLES["#conversion"]}
      </a>
    </div>
    <main id="root"></main>
    <div id="toast-content"></div>
      `;
  }

  renderContent() {
    window.addEventListener("load", () => this.renderOutlet());
    window.addEventListener("hashchange", () => this.renderOutlet());
  }

  private renderOutlet() {
    badgeUpdate();

    const hash = window.location.hash;
    const ROUTES: { [key: string]: typeof HTMLElement } = {
      "#account": AccountPage,
      "#transaction": TransactionPage,
      "#notifications": Notification,
      "#conversion": ConversionPage,
    };

    const $root = document.querySelector("#root");
    const $pageTitle = document.querySelector(".page-title");
    document.querySelectorAll("a").forEach((anchor) => {
      anchor.classList.remove("active-router");
    });
    document.querySelector(`a[href="${hash}"]`).classList.add("active-router");
    $pageTitle.innerHTML = PAGE_TITLES[hash];

    if ($root) $root.innerHTML = "";
    const Page = ROUTES[hash];
    if (Page) {
      const page = new Page();
      $root?.append(page);
    }
    const $menu = document.querySelector<HTMLElement>(".dropdown-menu");
    $menu?.addEventListener("mouseleave", () => {
      $menu.classList.remove("active");
    });
  }

  onInit() {
    this.activeSideBar();
    this.activeAccount();
  }

  activeSideBar() {
    const $iconHeader = document.querySelector<HTMLElement>("header .menu");
    const $sideBar = document.querySelector<HTMLElement>("router-app .side-bar");
    const $anchors = document.querySelectorAll(".anchors");

    $iconHeader?.addEventListener("click", (event) => {
      event.stopPropagation();
      $sideBar?.classList.toggle("active");
    });
    $anchors.forEach(($anchor) => {
      $anchor.addEventListener("click", (event) => {
        event.stopPropagation();
        $sideBar?.classList.remove("active");
      });
    });
  }
  activeAccount() {
    const $iconAccount = document.querySelector<HTMLElement>("header .account");
    const $accountMenu = document.querySelector<HTMLElement>("header .account-menu");
    const $optionMenu = document.querySelectorAll(".option-menu");
    $iconAccount.addEventListener("click", () => {
      $accountMenu.classList.toggle("active");
      $optionMenu.forEach((element) => {
        element.addEventListener("click", () => {
          $accountMenu.classList.remove("active");
        });
      });
    });
  }
}
