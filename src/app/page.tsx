"use client";

import { ConnectionForm } from "@/components/connection-form";
import { ListOfChats } from "@/components/list-of-chats";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function Home() {
  const { createConnection, isConnected, avaliableChats, closeConnection } =
    useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const estabilishConnection = async (username: string) => {
    if (isConnected) {
      closeConnection();
      return;
    }
    createConnection(username);
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen flex py-8 px-2 md:px-16 lg:px-80 flex-col justify-start items-center bg-background text-onBackground">
      <ConnectionForm
        isConnected={isConnected}
        isLoading={isLoading}
        establishConnection={estabilishConnection}
        closeConnection={closeConnection}
      />

      {isConnected && <ListOfChats avaliableChats={avaliableChats} />}
    </div>
  );
}
