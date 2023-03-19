import Form from "@/components/Form";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

import Logo from "../public/tiktoklogo.png";

export default function Home() {
  return (
    <main className="container p-4 mx-auto">
      <section className="flex flex-col items-center justify-center">
        <Image className="p-4 max-w-xs" alt="tiktok logo" src={Logo} />
        <div className="flex w-full flex-col gap-6 max-w-md">
          <Form />
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
}
