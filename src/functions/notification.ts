import { Transaction } from "../pages/transaction/transaction.page";

export function badgeUpdate() {
  const $badge = document.querySelector<HTMLSpanElement>(".badge");
  console.log($badge);
  if (!$badge) return;
  const transactionList = localStorage.getItem("transactionList") || "[]";
  const userLogged = localStorage.getItem("client");
  const notifications = JSON.parse(transactionList).filter((value: Transaction) => !value.view.includes(JSON.parse(userLogged).id));
  $badge.hidden = notifications.length <= 0;
  $badge.innerHTML = notifications.length;
}
