import { MessageProps, WebSocketMessage } from "@/models/message";
import { useEffect, useState } from "react";

type WebSocketHookProps = {
  createConnection: (username: string) => void;
  sendMessage: (msg: string) => void;
  isConnected: boolean;
  avaliableChats: Map<string, MessageProps[]>;
};

export const useWebSocket = (): WebSocketHookProps => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [connection, setConnection] = useState<WebSocket>();
  const [currentUser, setCurrentUser] = useState<string>("");

  const [avaliableChats, setAvaliableChats] = useState<
    Map<string, MessageProps[]>
  >(new Map());

  useEffect(() => {
    if (connection) {
      const handleMessage = (event: MessageEvent) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          switch (data.type) {
            case "users":
              const listOfUsers = getListOfUsers(data.content);
              const openChats = getOpenChats(listOfUsers, currentUser);
              setAvaliableChats((prev) => updateChatState(prev, openChats));
              break;
            case "queue":
              setAvaliableChats((prev) => updateMessages(prev, data));
              break; // Certifique-se de adicionar 'break' aqui
            case "topic":
              console.log(data);
              setAvaliableChats((prev) => {
                const newChats = new Map(prev);
                const newMessage: MessageProps = {
                  sender: data.sender,
                  receiver: data.receiver,
                  content: data.content,
                  createdAt: new Date(),
                };

                if (newChats.has("general")) {
                  newChats.get("general")!.push(newMessage);
                }

                return newChats;
              });
              break; // Certifique-se de adicionar 'break' aqui
            default:
              console.log("Tipo de mensagem desconhecido");
          }
        } catch {
          console.log("Erro ao processar a mensagem");
        }
      };

      connection.addEventListener("message", handleMessage);
      connection.addEventListener("error", (error) => {
        console.error("Erro na conexão WebSocket:", error);
      });
      connection.addEventListener("close", (event) => {
        setIsConnected(false);
        console.log("Conexão WebSocket fechada:");
      });

      // Função de limpeza para remover o listener
      return () => {
        connection.removeEventListener("message", handleMessage);
      };
    }
  }, [connection, currentUser]); // Adiciona connection e currentUser como dependências

  const createConnection = async (username: string) => {
    setConnection(
      new WebSocket(`ws://localhost:8080/chat?username=${username}`)
    );

    if (connection !== undefined) {
      connection.addEventListener("open", () => {
        setIsConnected(true);
        setCurrentUser(username);
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
    createConnection,
    avaliableChats,
  };
};

const getListOfUsers = (content: string) => {
  return content.split(",").map((user) => user.trim());
};

const getOpenChats = (listOfUsers: string[], currentUser: string) => {
  const chats = new Map<string, MessageProps[]>();

  listOfUsers.map((it) => {
    if (currentUser !== it) chats.set(it, []);
  });

  chats.set("general", []);

  return chats;
};

const updateChatState = (
  prev: Map<string, MessageProps[]>,
  openChats: Map<string, MessageProps[]>
) => {
  const newChats = new Map(prev);

  openChats.forEach((value, key) => {
    if (newChats.has(key)) {
      const existingMessages = newChats.get(key) || []; // Obtém as mensagens existentes
      newChats.set(key, [...existingMessages, ...value]); // Atualiza as mensagens
    } else {
      newChats.set(key, value);
    }
  });

  return newChats;
};

const updateMessages = (
  prev: Map<string, MessageProps[]>,
  data: WebSocketMessage
) => {
  const newChats = new Map(prev);

  // Supondo que `data` contém a nova mensagem
  const newMessage: MessageProps = {
    sender: data.sender,
    receiver: data.receiver,
    content: data.content,
    createdAt: new Date(),
  };

  // Adiciona a nova mensagem ao chat do remetente
  if (newChats.has(data.sender)) {
    newChats.get(data.sender)!.push(newMessage); // Adiciona a mensagem ao array existente
  } else {
    newChats.set(data.sender, [newMessage]); // Cria um novo array se não existir
  }

  // Adiciona a nova mensagem ao chat do destinatário
  if (newChats.has(data.receiver)) {
    newChats.get(data.receiver)!.push(newMessage); // Adiciona a mensagem ao array existente
  } else {
    newChats.set(data.receiver, [newMessage]); // Cria um novo array se não existir
  }

  return newChats; // Retorna o novo Map atualizado
};
