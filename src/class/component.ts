import { AboutPage } from "../pages/about.page.ts/about.page";
import { HomePage } from "../pages/home/home.page";

export class Routes extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
   <header>
      <span class="material-symbols-outlined menu"> menu </span>
    </header>
    <div class="side-bar">
      <div class="anchors">
        <span class="material-symbols-outlined"> home </span>
        <a href="#home">Home</a>
      </div>
      <div class="anchors">
        <span class="material-symbols-outlined"> info </span>
        <a href="#about">about</a>
      </div>
    </div>
    <main id="route-container"></main>
      `;
    this.renderContent();
    this.onInit();
  }
  renderContent() {
    const $routeContent = document.querySelector("#route-container");

    window.addEventListener("load", () => {
      const home = new HomePage();

      $routeContent?.appendChild(home);
    });
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;
      const ROUTES: { [key: string]: typeof HTMLElement } = {
        "#home": HomePage,
        "#about": AboutPage,
      };
      const $routeContent = document.querySelector("#route-container");
      if ($routeContent) $routeContent.innerHTML = "";
      const Page = ROUTES[hash];
      const home = new Page();
      $routeContent?.appendChild(home);
    });
  }

  onInit() {
    this.activeSideBar();
  }

  activeSideBar() {
    const $iconHeader = document.querySelector<HTMLElement>("header .menu");
    const $sideBar = document.querySelector<HTMLElement>("router-app .side-bar");
    const $anchors = document.querySelectorAll(".anchors");

    $iconHeader?.addEventListener("click", (event) => {
      event.preventDefault();
      $sideBar?.classList.toggle("active");
    });
    $anchors.forEach(($anchor) => {
      $anchor.addEventListener("click", () => {
        $sideBar?.classList.remove("active");
      });
    });
  }
}
