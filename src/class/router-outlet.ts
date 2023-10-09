import { AboutPage } from "../pages/about.page.ts/about.page";
import { HomePage } from "../pages/home/home.page";

export class RouterOutlet extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
   <header>
      <span class="material-symbols-outlined menu"> menu </span>
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
    </div>
    <main id="root"></main>
      `;
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
      $anchor.addEventListener("click", () => {
        $sideBar?.classList.remove("active");
      });
    });
  }
}
