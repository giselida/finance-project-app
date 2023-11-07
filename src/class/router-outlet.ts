import { AccountPage } from "../pages/account/account.page";
import { ConversionPage } from "../pages/conversion/conversion.page";
import { HomePage } from "../pages/home/home.page";
import { TransactionPage } from "../pages/transaction/transaction.page";
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
  "#home": createMaterialSymbol("home", "Inicio"),
  "#transaction": createMaterialSymbol("paid", "Transação"),
  "#account": createMaterialSymbol("account_circle", "Conta"),
  "#conversion": createMaterialSymbol(" price_change", "Conversor de Moedas"),
};
export class RouterOutlet extends HTMLElement {
  connectedCallback() {
    this.createInnerHTML();
    if (!window.location.hash) window.location.replace("#home");
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
      <div class="dropdown">
        <div class="user account">
        <span class="current-user">${client.name ?? ""}</span>
        <span class="material-symbols-outlined ">
          account_circle
        </span> 
        </div> 
        <div class="account-menu dropdown-menu">
           <a href="#account">
            <div class="option-menu dropdown-item">
              Conta
            </div> 
            </a>
        </div>
    </header>

    <div class="side-bar">
      <a href="#home"class="anchors">
         ${PAGE_TITLES["#home"]}
      </a>
      <a href="#conversion" class="anchors">
        ${PAGE_TITLES["#conversion"]}
      </a>
      <a href="#transaction" class="anchors">
         ${PAGE_TITLES["#transaction"]}
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
    const hash = window.location.hash;
    const ROUTES: { [key: string]: typeof HTMLElement } = {
      "#home": HomePage,
      "#transaction": TransactionPage,
      "#account": AccountPage,
      "#conversion": ConversionPage,
    };

    const $root = document.querySelector("#root");
    const $pageTitle = document.querySelector(".page-title");
    $pageTitle.innerHTML = PAGE_TITLES[hash];
    if ($root) $root.innerHTML = "";
    const Page = ROUTES[hash];
    if (Page) {
      const page = new Page();
      $root?.append(page);
    }
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
