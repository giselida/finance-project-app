export interface CardClient {
  id: number;
  cvv: number;
  color: string;
  validDate: string;
  cardNumber: string;
  limitCredit: number;
  limitCreditUsed: number;
  limitCreditCurrent: number;
  clientID: number;
}
