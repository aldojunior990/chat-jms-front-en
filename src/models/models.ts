export type MessageProps = {
  sender: string;
  receiver: string;
  content: string;
  createdAt: Date;
};

export interface PrivateMessage {
  type: string;
  content: string;
  sender: string;
  receiver: string;
}

export interface TopicMessage {
  type: string;
  content: string;
  sender: string;
}

export interface GenericMessage {
  type: string;
}

export type ServerMessage = {
  type: string;
  content: string;
};

export type AvaliableChats = {
  id: string;
  user: User;
  messages: MessageProps[];
};

export type User = {
  id: string;
  username: string;
};
