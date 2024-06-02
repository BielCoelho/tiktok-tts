import { VOICES } from "@/constants";
import { BadRequest } from "@/lib/errors";
import { fixPhrase } from "./textTools";

export const validateForm = (req: any) => {
  const text = req.text;
  const voice = req.voice;

  if (!text || !voice) throw new BadRequest();

  if (typeof text !== "string") throw new BadRequest();
  if (typeof voice !== "string") throw new BadRequest();

  const validVoice = VOICES.some((v) => v.voice === voice);
  if (!validVoice) throw new BadRequest("A voz selecionada não é válida.");

  return {
    get validated() {
      return { text, voice };
    },
    get normalized() {
      return { voice, text: fixPhrase(text) };
    },
  };
};
