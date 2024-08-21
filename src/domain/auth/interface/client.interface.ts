export interface Cliente {
  id: number;
  name: string;
  password: string;
  email?: string;
  accountNumber: string;
  accountAmount: number;
  selected: boolean;
}
