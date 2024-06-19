import { Transaction } from "../transaction/transaction.page";
import "./account-pay.page.scss";

const template = `
<div class="card">
    <div class="card-header">Cartões</div>
    <div class="card-body">
        <h5 class="card-title">Meus Cartões</h5>
        <div class="container">
            <div class="backdrop">
                <span class="material-symbols-outlined add-card-credit">add</span>
            </div>
        </div>
    </div>
</div>
`;

export interface ClientCard {
  id: number;
  cvv: number;
  validDate: string;
  cardNumber: string;
  limitCredit: number;
  limitCreditUsed: number;
  limitCreditCurrent: number;
  accountNumber: string;
}

export class AccountPayPage extends HTMLElement {
  transactionList: Transaction[];
  addClientCard: HTMLElement;
  clientCardList: ClientCard[];
  clientCard: ClientCard;

  connectedCallback() {
    this.createInnerHTML();
  }

  private createInnerHTML() {
    this.innerHTML = template;
  }
}
