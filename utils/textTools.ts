export const normalizePhrase = (phrase: string) =>
  phrase
    .replace(/[^\w\sÀ-ÿ+]/g, "")
    .trim()
    .toLowerCase();

export const abrasileirarPhrase = (phrase: string) =>
  phrase.replace("+", "mais").replace(/\s/g, "+").replace("&", "e");

export const fixPhrase = (phrase: string) => {
  const abrasileirado = abrasileirarPhrase(phrase);
  const normalized = normalizePhrase(abrasileirado);
  return normalized;
};

export const getAudioFileName = (phrase: string) => {
  const dashedPhrase = phrase.replace(/\s/g, "-");
  const slicedPhrase = dashedPhrase.split("-").slice(0, 3).join("-");
  const audioFileName = `${slicedPhrase}.mp3`;
  return audioFileName;
};
