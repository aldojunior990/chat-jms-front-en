"use client";

import { ReactNode, useState } from "react";
import { AppContext } from "./AppContext";

type ContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<string>("");

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};
