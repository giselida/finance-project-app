import { RouterOutlet } from "./class/router-outlet";
import { FormSelect } from "./components/form-select/form-select";
import { AboutPage } from "./pages/about/about.page";
import { AccountPage } from "./pages/account/account.page";
import { ConversionPage } from "./pages/conversion/convercio.page";
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
  {
    selector: "account-page",
    class: AccountPage,
  },
  {
    selector: "conversion-page",
    class: ConversionPage,
  },
];

options.forEach((option) => {
  customElements.define(option.selector, option.class);
});
