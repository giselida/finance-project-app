import "./notification.page.scss";
export class Notification extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `olá `;
  }
}
