export type MessageProps = {
  sender: string;
  receiver: string;
  content: string;
  createdAt: Date;
};

export interface WebSocketMessage {
  type: string; // Tipo da mensagem, como 'topic'
  content: string; // Conteúdo da mensagem
  sender: string; // Remetente da mensagem
  receiver: string; // Destinatário da mensagem
}
