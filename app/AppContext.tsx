"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface IContextProps {
  audio: string;
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IContextProps>({
  text: "",
  setText: () => {},
  audio: "",
  setAudio: () => {},
  error: "",
  setError: () => {},
  loading: false,
  setLoading: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        audio,
        setAudio,
        error,
        setError,
        text,
        setText,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
