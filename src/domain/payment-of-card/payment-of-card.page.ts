import { generatePropertyBind } from "../../functions/property-bind";
import html from "./payment-of-card.page.html?raw";
import "./payment-of-card.page.scss";
export class PaymentOfCardPage extends HTMLElement {
  connectedCallback() {
    generatePropertyBind.bind(this, html)();
  }
}
