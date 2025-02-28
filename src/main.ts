import { FormSelect } from "./components/form-select/form-select";
import { RouterOutlet } from "./components/router-outlet/router-outlet";
import { AccountPage } from "./domain/account/account.page";
import { LoginComponent } from "./domain/auth/login/login.page";
import { RegisterComponent } from "./domain/auth/register/register.page";
import { CardAccountPage } from "./domain/card-account/card-account.page";
import { ConversionPage } from "./domain/conversion/conversion.page";
import { InvoiceOfCardPage } from "./domain/invoice-of-card/invoice-of-card.page";
import { Notification } from "./domain/notification/notification.page";
import { PaymentOfCardPage } from "./domain/payment-of-card/payment-of-card.page";
import { TransactionPage } from "./domain/transaction/transaction.page";
import "./style.scss";

Number.prototype.formatToBRL = function (): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(this as number);
};

String.prototype.convertStringDate = function (): Date | null {
  if (!this) return null;
  const dateString = this.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, "$2-$1-$3");
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

String.prototype.capitalizeFirstLetter = function (): string {
  if (!this) return "";
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

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
    selector: "invoice-of-card-page",
    class: InvoiceOfCardPage,
  },
  {
    selector: "payment-of-card-page",
    class: PaymentOfCardPage,
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
