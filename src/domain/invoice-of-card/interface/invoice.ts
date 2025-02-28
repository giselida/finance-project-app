export interface Invoice {
  id: number;
  value: number;
  date: string; // data de vencimento
  closingDate: string; // data de fechamento
  cardID: number;
  clientID: number;
  transactions: Array<number>;
  status: number;
}
