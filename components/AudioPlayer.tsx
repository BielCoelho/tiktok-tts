"use client";

import { useAppContext } from "@/app/AppContext";
import { generateFile } from "@/lib/api";
import { useEffect, useRef } from "react";
import { MdWhatsapp } from "react-icons/md";
import { AlertError } from "./AlertError";
import { getAudioFileName } from "@/utils/textTools";
import { LOCAL_STORAGE } from "@/constants";

export default function AudioPlayer() {
  const { audio, text, error, loading, setLoading } = useAppContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    handlePlay();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = Number(localStorage.getItem(LOCAL_STORAGE.VOLUME)) || 1;
    audioRef.current.play();
  };

  const handleDownload = () => {
    console.log(getAudioFileName(text));
    const link = document.createElement("a");
    link.href = `data:audio/mpeg;base64,${audio}`;
    link.download = getAudioFileName(text);
    link.click();
  };

  const handleShare = async () => {
    const audioString = `data:audio/mpeg;base64,${audio}`;

    const audioFile = await generateFile(audioString);

    try {
      await navigator.share({
        files: [audioFile],
        title: "Audio gerado @ https://tiktok.gabrielchaves.dev",
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <AlertError>{error}</AlertError>;

  return (
    <>
      {text !== "" && (
        <div className="flex gap-4 flex-col justify-center items-center p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
          <div className="flex justify-center items-center rounded-lg p-4 w-full text-sm bg-gray-700 border-0 border-b-2 border-transparent appearance-none text-white focus:outline-none focus:ring-0 focus:border-transparent peer">
            {loading ? (
              <div>
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 animate-spin text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <span>{error ? error : `"${text}"`}</span>
            )}
          </div>
          <audio
            controls
            onVolumeChange={(e) =>
              localStorage.setItem(LOCAL_STORAGE.VOLUME, String((e.target as HTMLAudioElement).volume || 0.5))
            }
            ref={audioRef}
            src={`data:audio/mpeg;base64,${audio}`}
          />
          {audio === "" ? (
            <></>
          ) : (
            <div className="flex justify-between w-full gap-2 mt-4">
              <button
                className="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                onClick={handlePlay}
              >
                Tocar
              </button>
              <button
                className="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                onClick={handleDownload}
              >
                Baixar
              </button>
              <button
                className="flex items-center gap-2 border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                onClick={handleShare}
              >
                <MdWhatsapp size="22" />
                Compartilhar
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
