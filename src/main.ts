import { RouterOutlet } from "./class/router-outlet";
import { AboutPage } from "./pages/about.page.ts/about.page";
import { HomePage } from "./pages/home/home.page";
import "./style.scss";

customElements.define("home-page", HomePage);
customElements.define("about-page", AboutPage);
customElements.define("router-app", RouterOutlet);

const app = new RouterOutlet();

document.body.append(app);
