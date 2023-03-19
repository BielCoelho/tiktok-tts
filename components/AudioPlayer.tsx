"use client";

import { useAppContext } from "@/app/AppContext";
import { useRef } from "react";

export default function AudioPlayer() {
  const { audio } = useAppContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    <div className="player">
      <audio ref={audioRef} src={`data:audio/mpeg;base64,${audio}`} />
      <button className="btn" onClick={handlePlay}>
        Play
      </button>
      <button className="btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}
