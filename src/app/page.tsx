"use client";

import { ConnectionForm } from "@/components/connection-form";
import { ListOfChats } from "@/components/list-of-chats";
import { useWebSocket } from "@/hooks/websocket";
import { useState } from "react";

type ConnectionState = {
  isConnected: boolean;
  isLoading: boolean;
};

const defaulConnectionState: ConnectionState = {
  isConnected: false,
  isLoading: false,
};

export default function Home() {
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    defaulConnectionState
  );

  const { isConnected, createConnection, sendMessage, avaliableChats } =
    useWebSocket();

  const estabilishConnection = async (username: string) => {
    setConnectionState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    await createConnection(username);

    setConnectionState((prev) => ({
      isConnected: true,
      isLoading: false,
    }));
  };

  const closeConnection = async () => {
    setConnectionState((prev) => ({
      isConnected: false,
      isLoading: false,
    }));
  };

  return (
    <div className="w-full h-screen flex py-8 px-2 md:px-16 lg:px-80 flex-col justify-start items-center bg-background text-onBackground">
      <ConnectionForm
        isConnected={connectionState.isConnected}
        isLoading={connectionState.isLoading}
        establishConnection={estabilishConnection}
        closeConnection={closeConnection}
      />
<<<<<<< HEAD
      {connectionState.isConnected && <ListOfChats connectedUsers={users} />}
    </div>
  );
}
=======

      {connectionState.isConnected && (
        <ListOfChats avaliableChats={avaliableChats} />
      )}
    </div>
  );
}
>>>>>>> 2d0bb0c89f97260c1e3152151b71c75889a7725c
