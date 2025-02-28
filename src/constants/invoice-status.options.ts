export enum InvoiceStatus {
  ABERTA = 1,
  FECHADA = 2,
  VENCIDA = 3,
  PAGA = 4,
}

export const invoiceStatusOptions = [
  {
    id: InvoiceStatus.ABERTA,
    name: "Aberta",
  },
  {
    id: InvoiceStatus.FECHADA,
    name: "Fechada",
  },
  {
    id: InvoiceStatus.VENCIDA,
    name: "Vencida",
  },
  {
    id: InvoiceStatus.PAGA,
    name: "Paga",
  },
];
