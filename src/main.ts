import { Routes } from "./class/component";
import { AboutPage } from "./pages/about.page.ts/about.page";
import { HomePage } from "./pages/home/home.page";
import "./style.scss";

customElements.define("home-page", HomePage);
customElements.define("about-page", AboutPage);
customElements.define("router-app", Routes);

const app = new Routes();

document.body.append(app);
