import {
  AvaliableChats,
  PrivateMessage,
  ServerMessage,
  TopicMessage,
  User,
} from "@/models/models";

export const getConnectedUsers = (content: string): AvaliableChats[] => {
  const avaliableChats: AvaliableChats[] = [];

  const listOfUsersString = content
    .split("), (")
    .map((user) => user.replace(/[()]/g, ""));

  const listOfUsers: User[] = listOfUsersString.map((userString) => {
    const [id, username] = userString.split(", ").map((item) => item.trim());
    return { id: id, username: username };
  });

  listOfUsers.map((it) => {
    avaliableChats.push({
      id: combinatedID(it.id === "1" ? "global-chat" : "private-chat", it.id),
      user: it,
      messages: [],
    });
  });

  return avaliableChats;
};

export const getUserDetails = (message: ServerMessage): User => {
  const receiver = message.content.replace(/[()]/g, "").split(",");
  return { id: receiver[0].trim(), username: receiver[1].trim() };
};

export const isServerMessage = (obj: any): obj is ServerMessage => {
  return typeof obj.type === "string" && typeof obj.content === "string";
};

export const isPrivateMessage = (obj: any): obj is PrivateMessage => {
  return (
    typeof obj.type === "string" &&
    typeof obj.content === "string" &&
    typeof obj.sender === "string" &&
    typeof obj.receiver === "string"
  );
};

export const isTopicMessage = (obj: any): obj is TopicMessage => {
  return (
    typeof obj.type === "string" &&
    typeof obj.content === "string" &&
    typeof obj.sender === "string"
  );
};

export const combinatedID = (first: string, second: string) => {
  return first < second ? `${first}-${second}` : `${second}-${first}`;
};
