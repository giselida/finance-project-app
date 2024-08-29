import { StorageService } from "../../components/storage/storage";
import { Cliente } from "../../domain/auth/interface/client.interface";
import { Transaction } from "../../domain/transaction/interface/transaction.interface";

export function badgeUpdate(): void {
  const $badge = document.querySelector<HTMLSpanElement>(".badge");
  if (!$badge) return;

  const transactionList: Transaction[] = StorageService.getItem<Transaction[]>("transactionList", []);
  const userLogged: Pick<Cliente, "id"> = StorageService.getItem<Pick<Cliente, "id">>("client", { id: 0 });

  if (typeof userLogged.id !== "number") return;

  const notifications = transactionList.filter(
    (transaction: Transaction) => !transaction.view.includes(userLogged.id) && transaction.dateOfPayDay
  );

  $badge.hidden = notifications.length === 0;
  $badge.innerHTML = notifications.length.toString();
}
