import { AboutPage } from "../pages/home/about.page.ts/about.page";
import { HomePage } from "../pages/home/home.page";

export class Routes extends HTMLElement {
  constructor() {
    super();
    this.connectedCallback();
  }
  connectedCallback() {
    this.innerHTML = `
<header>
<span class="material-symbols-outlined">
menu
</span>
</header>
<div class="sid-bar">
<div class="anchors"> 
    <span class="material-symbols-outlined">
      home
        </span>
         <a href="#home">Home</a>
    </div>
<div class="anchors"> 
    <span class="material-symbols-outlined">
      info
        </span>
         <a href="#about">about</a>
    </div></div>
      <main id="route-container"></main>
      `;
    this.renderContent();
  }
  renderContent() {
    const $routeContent = document.querySelector("#route-container");

    window.addEventListener("load", () => {
      const home = new HomePage();
      $routeContent?.appendChild(home);
      this.onInit();
    });
  }

  onInit() {
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
}
