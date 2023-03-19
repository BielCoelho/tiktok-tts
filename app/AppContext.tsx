"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface IContextProps {
  audio: string;
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IContextProps>({
  audio: "",
  setAudio: () => {},
  error: false,
  setError: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState("");
  const [error, setError] = useState(false);

  return (
    <AppContext.Provider value={{ audio, setAudio, error, setError }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
