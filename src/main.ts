import { RouterOutlet } from "./class/router-outlet";
import { FormSelect } from "./components/form-select/form-select";
import { AboutPage } from "./pages/about.page.ts/about.page";
import { HomePage } from "./pages/home/home.page";
import "./style.scss";

customElements.define("form-select", FormSelect);
customElements.define("home-page", HomePage);
customElements.define("about-page", AboutPage);
customElements.define("router-app", RouterOutlet);
