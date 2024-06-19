import { convertStringDate } from "../../functions/date/date";
import { badgeUpdate } from "../../functions/notification/notification";
import { Cliente } from "../account/account.page";
import { Transaction } from "../transaction/transaction.page";
import "./notification.page.scss";
export class Notification extends HTMLElement {
  transactionList: Transaction[];

  get clientLogged(): Cliente {
    return JSON.parse(localStorage.getItem("client") ?? "{}");
  }

  get clients(): Cliente[] {
    return JSON.parse(localStorage.getItem("clients") ?? "[]");
  }
  connectedCallback() {
    this.transactionList = JSON.parse(localStorage.getItem("transactionList") ?? "[]");
    const transaction = this.transactionList.filter((value) => value.dateOfPayDay);

    this.innerHTML = /*html*/ `
    <span class="account-info">
  Você não possui notificações!
</span>
    <div class="list-group">
    ${transaction
      .toReversed()
      .map((transaction) => {
        const isCurrentUser = this.clientLogged.id === transaction.userLoggedID;
        const transactionClient = this.clients.find((client) => {
          const propertyName = !isCurrentUser ? "userLoggedID" : "clientID";

          return client.id === +transaction[propertyName];
        });
        const operationTitle = !isCurrentUser ? "recebida" : "enviada";
        const operationMessage = !isCurrentUser ? "Você recebeu uma transação de" : "Você enviou uma transação para ";
        const shortDate = convertStringDate(transaction.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        return /*html*/ `  
    <div class="list-group-item list-group-item-action ${
      !transaction.view.includes(this.clientLogged.id) ? "active" : ""
    }" aria-current="true" id="${transaction.id}" >
       <div class="d-flex w-100 justify-content-between">
          <h5 class="title mb-2">Transferência ${operationTitle} com sucesso !</h5>
          </div>
        <div class="current-date">${transaction.date}</div>
       <p class="description mb-2">
       ${operationMessage} ${transactionClient?.name}-${transactionClient?.accountNumber} no valor
        <b>R$ ${transaction.value.toFixed(2)} </b> em ${transaction.date} 
       </p>
       <small>${shortDate}</small>
    </div>`;
      })
      .join("")}
</div>`;
    document.querySelectorAll(".list-group-item").forEach(($item) => {
      $item.addEventListener("click", () => {
        if (!$item.classList.contains("active")) return;
        const transactionID = $item.getAttribute("id");
        this.transactionList.find((transaction) => transaction.id == +transactionID).view.push(this.clientLogged.id);
        $item.classList.remove("active");
        localStorage.setItem("transactionList", JSON.stringify(this.transactionList));
        badgeUpdate();
      });
      // $item.addEventListener("contextmenu", (event) => {
      //   event.preventDefault();
      // });
    });
    const $accountInfo = document.querySelector<HTMLElement>(".account-info");
    $accountInfo.style.display = transaction.length < 1 ? "block" : "none";
  }
}
