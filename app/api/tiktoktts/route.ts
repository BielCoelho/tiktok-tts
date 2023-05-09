import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface IReqBody {
  text: string;
  voice: string;
}

export const POST = async (req: NextRequest) => {
  const reqBody: IReqBody = await req.json();
  if (!reqBody.text || !reqBody.voice)
    return NextResponse.json({ error: true, message: "missing inputs" });

  const sessionId = "597522948f76ac5b63fe8e0b12345f98";
  const serverURL =
    "https://api16-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke";

  const fixInput = (input: string) => {
    input = input.replace("+", "mais");
    input = input.replace(/\s/g, "+");
    return input;
  };

  const handleError = (status_code: number) => {
    switch (status_code) {
      case 1:
        return NextResponse.json({
          error: true,
          message: `Tiktok session id expired. status_code: ${status_code}`,
        });
      case 2:
        return NextResponse.json({
          error: true,
          message: `Text too long. status_code: ${status_code}`,
        });
      case 4:
        return NextResponse.json({
          error: true,
          message: `Selected voice error. status_code: ${status_code}`,
        });
      case 5:
        return NextResponse.json({
          error: true,
          message: `Session id error. status_code: ${status_code}`,
        });
    }
  };

  const getAudio = async () => {
    const text = fixInput(reqBody.text);
    const voice = reqBody.voice;

    const reqUrl = `${serverURL}/?text_speaker=${voice}&req_text=${text}&speaker_map_type=0&aid=1233`;
    const headers = {
      "User-Agent":
        "com.zhiliaoapp.musically/2022600030 (Linux; U; Android 7.1.2; es_ES; SM-G988N; Build/NRD90M;tt-ok/3.12.13.1)",
      Cookie: `sessionid=${sessionId}`,
      "Accept-Encoding": "gzip,deflate,compress",
    };
    const result = await axios.post(reqUrl, null, { headers: headers });
    const status_code = result?.data?.status_code;
    if (status_code !== 0) return handleError(status_code);
    const encoded_voice = result?.data?.data?.v_str;

    return encoded_voice;
  };

  const audio = await getAudio();

  return NextResponse.json({ error: false, data: audio });
};
