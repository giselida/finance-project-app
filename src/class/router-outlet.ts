import { AboutPage } from "../pages/about/about.page";
import { AccountPage } from "../pages/account/account.page";
import { ConversionPage } from "../pages/conversion/convercio.page";
import { HomePage } from "../pages/home/home.page";

export class RouterOutlet extends HTMLElement {
  connectedCallback() {
    const client = JSON.parse(localStorage.getItem("client") ?? "{}");

    this.innerHTML = /*html*/ `
   <header>
      <span class="material-symbols-outlined menu"> menu </span>
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
              Alterar conta
            </div> 
            </a>
        </div>
    </header>

    <div class="side-bar">
      <a href="#home"class="anchors">
        <span class="material-symbols-outlined"> home </span>
        <span >Home</span>
      </a>
      <a href="#about" class="anchors">
        <span class="material-symbols-outlined"> info </span>
        <span>About</span>
      </a>
      <a href="#conversion" class="anchors">
        <span class="material-symbols-outlined"> info </span>
        <span>Conversor</span>
      </a>
    </div>
    <main id="root"></main>
    <div id="toast-content"></div>

      `;
    if (!window.location.hash) window.location.replace("#home");
    this.renderContent();
    this.onInit();
  }
  renderContent() {
    window.addEventListener("load", () => this.renderOutlet());
    window.addEventListener("hashchange", () => this.renderOutlet());
  }

  private renderOutlet() {
    const hash = window.location.hash;
    const ROUTES: { [key: string]: typeof HTMLElement } = {
      "#home": HomePage,
      "#about": AboutPage,
      "#account": AccountPage,
      "#conversion": ConversionPage,
    };
    const $root = document.querySelector("#root");
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
