import { RouterOutlet } from "./class/router-outlet";
import { FormSelect } from "./components/form-select/form-select";
import { AccountPage } from "./pages/account/account.page";
import { ConfigurationPage } from "./pages/configuration/configuration.page";
import { ConversionPage } from "./pages/conversion/conversion.page";
import { Notification } from "./pages/notification/notification.page";
import { TransactionPage } from "./pages/transaction/transaction.page";
import "./style.scss";

export const options = [
  {
    selector: "form-select",
    class: FormSelect,
  },
  {
    selector: "configuration-page",
    class: ConfigurationPage,
  },
  {
    selector: "transaction-page",
    class: TransactionPage,
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
    selector: "notification-page",
    class: Notification,
  },
  {
    selector: "conversion-page",
    class: ConversionPage,
  },
];

options.forEach((option) => {
  customElements.define(option.selector, option.class);
});
