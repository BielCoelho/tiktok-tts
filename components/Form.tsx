"use client";

import { useAppContext } from "@/app/AppContext";
import { apiTts } from "@/lib/api";
import { FormEvent, useState } from "react";

export default function Form() {
  const { setAudio } = useAppContext();
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("br_003");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const audio = await apiTts({ text, voice });

    setAudio(audio);
  };

  return (
    <form className="content" onSubmit={handleSubmit}>
      <input
        required
        className="inputbox"
        placeholder="Escreva o audio a ser gerado aqui"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Gerar</button>
    </form>
  );
}
