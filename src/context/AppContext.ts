"use client";

import {
  AvaliableChats,
  User,
  PrivateMessage,
  TopicMessage,
} from "@/models/models";
import { createContext, useContext } from "react";

type AppContextType = {
  currentUser: User | null;
  isConnected: boolean;
  createConnection: (username: string) => boolean;
  sendMessage: (message: PrivateMessage | TopicMessage) => void;
  avaliableChats: AvaliableChats[];
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);
