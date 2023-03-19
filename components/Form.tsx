"use client";

import { useAppContext } from "@/app/AppContext";
import { apiTts } from "@/lib/api";
import { FormEvent, useState } from "react";

export default function Form() {
  const { setAudio, setLoading, setError, setText, text } = useAppContext();
  const [inputText, setInputText] = useState("");
  const [voice, setVoice] = useState("br_003");

  const voices = [
    { voice: "br_003", title: "Marcia" },
    { voice: "br_004", title: "Daniela" },
    { voice: "br_005", title: "Tiago" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setText(inputText);
    const audio = await apiTts({ text: inputText, voice }).catch((err) => {
      setError(true);
      console.error(err);
    });

    if (audio?.error) {
      setError(true);
      setText(audio.error);
    }

    setAudio(audio);
  };

  return (
    <form className="w-full mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
      <textarea
        required
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Digite o texto que deseja gerar"
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
          className="block py-2 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          {voices.map((v) => (
            <option key={v.title} value={v.voice}>
              {v.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Gerar
        </button>
      </div>
    </form>
  );
}
