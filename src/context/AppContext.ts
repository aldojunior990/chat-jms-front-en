"use client";

import { createContext, useContext } from "react";

type AppContextType = {
  currentUser: string;
  setCurrentUser: (username: string) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);
