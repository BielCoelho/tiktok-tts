"use client";

import { useAppContext } from "@/app/AppContext";
import { useEffect, useRef } from "react";

export default function AudioPlayer() {
  const { audio } = useAppContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  console.log(audio);

  useEffect(() => {
    handlePlay();
  }, [audio]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:audio/mpeg;base64,${audio}`;
    link.download = "audio.mp3";
    link.click();
  };

  return (
    <div className="flex justify-center items-center">
      <audio ref={audioRef} src={`data:audio/mpeg;base64,${audio}`} />
      <button
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={handlePlay}
      >
        Play
      </button>
      <button
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}
