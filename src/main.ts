import { FormSelect } from "./components/form-select/form-select";
import { RouterOutlet } from "./components/router-outlet/router-outlet";
import { AccountPage } from "./domain/account/account.page";
import { LoginComponent } from "./domain/auth/login/login.page";
import { RegisterComponent } from "./domain/auth/register/register.page";
import { CardAccountPage } from "./domain/card-account/card-account.page";
import { ConversionPage } from "./domain/conversion/conversion.page";
import { Notification } from "./domain/notification/notification.page";
import { TransactionPage } from "./domain/transaction/transaction.page";
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
    selector: "card-account-page",
    class: CardAccountPage,
  },
  {
    selector: "login-page",
    class: LoginComponent,
  },
  {
    selector: "register-page",
    class: RegisterComponent,
  },
];

options.forEach((option) => {
  customElements.define(option.selector, option.class);
});
