import { WebSocketMessage } from "@/models/message";
import { useEffect, useState } from "react";

type WebSocketHookProps = {
  createConnection: (username: string) => void;
  sendMessage: (msg: string) => void;
  isConnected: boolean;
  messages: string[];
  listOfUsers: string[];
};

export const useWebSocket = (): WebSocketHookProps => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [connection, setConnection] = useState<WebSocket>();
  const [listOfUsers, setListOfUsers] = useState<string[]>([]);

  useEffect(() => {
    if (connection !== undefined) {
      connection.addEventListener("message", (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);

        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          console.log(data);

          if (data.type === "users") {
            const usersArray = data.content
              .split(",")
              .map((user) => user.trim());
            setListOfUsers(usersArray);
            console.log("Lista de usuários atualizada:", usersArray);
          }
        } catch {}

        // console.log("Mensagem recebida:", event.data);
      });

      connection.addEventListener("error", (error) => {
        console.error("Erro na conexão WebSocket:", error);
      });

      connection.addEventListener("close", (event) => {
        setIsConnected(false);
        console.log("Conexão WebSocket fechada:", event.reason);
      });
    }
  }, [connection]);

  const createConnection = async (username: string) => {
    setConnection(
      new WebSocket(`ws://localhost:8080/chat?username=${username}`)
    );

    if (connection !== undefined) {
      connection.addEventListener("open", () => {
        setIsConnected(true);
        console.log("Conexão estabelecida");
      });
    }
  };

  const sendMessage = (message: string) => {
    if (connection) {
      connection.send(message);
    }
  };

  return {
    sendMessage,
    isConnected,
    messages,
    createConnection,
    listOfUsers,
  };
};
