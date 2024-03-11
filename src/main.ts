import { FormSelect } from "./components/form-select/form-select";
import { RouterOutlet } from "./components/router-outlet/router-outlet";
import { AccountPayPage } from "./pages/account-pay/account-pay.page";
import { AccountPage } from "./pages/account/account.page";
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
    selector: "account-page",
    class: AccountPage,
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
    selector: "notification-page",
    class: Notification,
  },
  {
    selector: "conversion-page",
    class: ConversionPage,
  },
  {
    selector: "account-pay-page",
    class: AccountPayPage,
  },
];
options.forEach((option) => {
  customElements.define(option.selector, option.class);
});
