"use client";

import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import {
  AvaliableChats,
  GenericMessage,
  PrivateMessage,
  ServerMessage,
  TopicMessage,
  User,
} from "@/models/models";
import { combinatedID, getConnectedUsers, getUserDetails } from "@/utils/utils";

type ContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connection, setConnection] = useState<WebSocket | null>(null);
  const [avaliableChats, setAvaliableChats] = useState<AvaliableChats[]>([]);

  useEffect(() => {
    avaliableChats.map((it) =>
      console.log(it.id, it.user.username, it.messages)
    );
  }, [avaliableChats]);
  useEffect(() => {
    if (connection) {
      connection.addEventListener("open", () => {
        setIsConnected(true);
      });

      connection.addEventListener("message", (event) => {
        try {
          const message: GenericMessage = JSON.parse(event.data);

          console.log(message);
          if (message.type === "user-details") {
            const serverMessage: ServerMessage = JSON.parse(event.data);
            setCurrentUser(getUserDetails(serverMessage));
            return;
          }

          if (message.type === "users-list") {
            const serverMessage: ServerMessage = JSON.parse(event.data);
            const updateChats = getConnectedUsers(serverMessage.content);

            setAvaliableChats((prevChats) =>
              updateChats.map((newChat) => {
                const existingChat = prevChats.find(
                  (prevChat) => prevChat.user.id === newChat.user.id
                );

                if (existingChat) {
                  return {
                    ...newChat,
                    messages: existingChat.messages,
                  };
                }

                return newChat;
              })
            );

            return;
          }

          if (message.type === "topic") {
            const topicMessage: TopicMessage = JSON.parse(event.data);
            setAvaliableChats((prev) =>
              prev.map((chat) => {
                if (chat.id === "1-global-chat") {
                  return {
                    ...chat,
                    messages: [
                      ...chat.messages,
                      {
                        content: topicMessage.content,
                        createdAt: new Date(),
                        receiver: "chat geral",
                        sender: topicMessage.sender,
                      },
                    ],
                  };
                }
                return chat;
              })
            );
            return;
          }

          if (message.type === "queue") {
            const privateMessage: PrivateMessage = JSON.parse(event.data);
            if (privateMessage.type === "queue") {
              setAvaliableChats((prev) =>
                prev.map((chat) => {
                  if (chat.id !== "1-global-chat") {
                    if (
                      chat.id ===
                        combinatedID("private-chat", privateMessage.receiver) ||
                      chat.id ===
                        combinatedID("private-chat", privateMessage.sender)
                    ) {
                      return {
                        ...chat,
                        messages: [
                          ...chat.messages,
                          {
                            content: privateMessage.content,
                            createdAt: new Date(),
                            receiver: privateMessage.receiver,
                            sender: privateMessage.sender,
                          },
                        ],
                      };
                    }
                  }
                  return chat;
                })
              );
            }
            return;
          }
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      });

      connection.addEventListener("close", () => {
        setIsConnected(false);
        setCurrentUser(null);
        setConnection(null);
        console.log("WebSocket connection closed");
      });

      connection.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
        connection.close();
        setIsConnected(false);
        setCurrentUser(null);
        setConnection(null);
        console.log("WebSocket connection closed");
      });

      return () => {
        connection.close();
      };
    }
  }, [connection]);

  const createConnection = (username: string) => {
    if (connection) {
      console.log("Já existe uma conexão ativa.");
      return false;
    }
    try {
      const ws = new WebSocket(`ws://localhost:8080/chat?username=${username}`);
      setConnection(ws);
      setIsConnected(true);
      return true;
    } catch (error) {
      console.error("Erro ao tentar criar a conexão:", error);
      return false;
    }
  };

  const sendMessage = (message: PrivateMessage | TopicMessage) => {
    if (connection && isConnected) {
      connection.send(JSON.stringify(message));
    } else {
      console.warn("Conexão WebSocket não está ativa.");
    }
  };

  const closeConnection = () => {
    if (connection && isConnected) {
      connection.close();
      setIsConnected(false);
      setCurrentUser(null);
      setConnection(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        createConnection,
        isConnected,
        sendMessage,
        avaliableChats,
        closeConnection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
