"use server";

import { fetchTTS } from "@/lib/api";
import { validateForm } from "@/utils/validateForm";

interface GenerateVoiceProps {
  voice: string;
  text: string;
}

export async function generateVoice(req: GenerateVoiceProps | unknown) {
  const { voice, text } = validateForm(req).normalized;
  const res = await fetchTTS(voice, text);
  if (res.status_code !== 0) throw new Error(res.message);

  return {
    duration: Number(res.data.duration),
    audio: res.data.v_str,
    phrase: text.replace(/\+/g, " "),
    voice: res.data.speaker,
  };
}
