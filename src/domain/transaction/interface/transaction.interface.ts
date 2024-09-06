export interface Transaction {
  id: number;
  value: number;
  idFormOfPayment: number;
  clientName: string;
  clientID: number;
  userLoggedID: number;
  creditCardID: number;
  date: string;
  view: number[];
  active: boolean;
  dateOfPayDay?: string;
  idDescription?: number;
}
