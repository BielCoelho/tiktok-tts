"use client";

import { useAppContext } from "@/app/AppContext";
import { generateVoice } from "@/app/_action";
import { VOICES } from "@/constants";
import { FormEvent, useState } from "react";

const frasePadrao = "Eu estou saudando a mandioca";

export default function Form() {
  const { setAudio, setLoading, setError, setText } = useAppContext();
  const [inputText, setInputText] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState("a093rjf");
  const [voice, setVoice] = useState<string>(VOICES[0].voice);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputText === lastSubmitted) return;

    setLoading(true);

    const text = inputText || frasePadrao;

    try {
      const data = await generateVoice({ text, voice });
      setText(data.phrase);
      setAudio(data.audio);
      setLastSubmitted(text);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
      <textarea
        autoComplete="off"
        spellCheck="false"
        className="block w-full p-4  border rounded-lg m:text-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder={frasePadrao}
        value={inputText}
        onChange={(e) => {
          const length = e.target.value.length;
          if (length > 280) return;
          setInputText(e.target.value);
        }}
      />
      <div className="flex gap-4">
        <select
          id="voice"
          name="voice"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          {VOICES.map((v) => (
            <option key={v.title} value={v.voice}>
              {v.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
        >
          Gerar
        </button>
      </div>
    </form>
  );
}
