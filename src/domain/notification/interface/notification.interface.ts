export interface Notification {
  id: string; // Identificador único da notificação (pode ser o ID da transação)
  transactionId: string; // ID da transação associada
  userId: number; // ID do usuário que recebeu a notificação
  dateCreated: string; // Data e hora da criação da notificação (ISO string)
  isRead: boolean; // Indica se a notificação já foi visualizada pelo usuário
}
