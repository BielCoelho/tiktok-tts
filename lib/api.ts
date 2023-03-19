interface IApiTtsProps {
  text: string;
  voice: string;
}

export const apiTts = async ({ text, voice }: IApiTtsProps) => {
  const res = await fetch("/api/tiktoktts", {
    method: "POST",
    body: JSON.stringify({
      text,
      voice,
    }),
  });
  if (!res.ok) return { error: true };

  const { data, error } = await res.json();

  if (error) return { error: true, data: error };

  return data;
};
