import { TiktokAPIResponse } from "@/interfaces/tiktok";
import { BielError } from "./errors";

export const fetchTTS = async (voice: string, text: string): Promise<TiktokAPIResponse> => {
  const url = getTTSUrl(voice, text);
  const headers = getTTSHeaders();
  const res = await fetch(url, {
    method: "POST",
    headers,
  });

  if (!res.ok) throw new BielError("Erro ao conectar com a API do TikTok");

  return await res.json();
};

export const generateFile = async (file: string, filename: string) => {
  const audioFile = await fetch(file)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], filename, {
        type: "audio/mpeg",
      });
      return file;
    });

  return audioFile;
};

export const getTTSUrl = (voice: string, text: string) =>
  `${process.env.TIKTOK_TTS_URL}?text_speaker=${voice}&req_text=${encodeURI(text)}&speaker_map_type=0&aid=1233`;

export const getTTSHeaders = () => {
  return {
    "User-Agent": process.env.TIKTOK_USER_AGENT!,
    Cookie: `sessionid=${process.env.TIKTOK_SESSION_ID!}`,
  };
};
