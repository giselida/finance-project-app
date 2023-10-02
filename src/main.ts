import { RouterOutlet } from "./class/router-outlet";
import { FormSelect } from "./components/form-select/form-select";
import { AboutPage } from "./pages/about.page.ts/about.page";
import { HomePage } from "./pages/home/home.page";
import "./style.scss";

const options = [
  {
    selector: "form-select",
    class: FormSelect,
  },
  {
    selector: "home-page",
    class: HomePage,
  },
  {
    selector: "about-page",
    class: AboutPage,
  },
  {
    selector: "router-app",
    class: RouterOutlet,
  },
];

options.forEach((option) => {
  customElements.define(option.selector, option.class);
});
