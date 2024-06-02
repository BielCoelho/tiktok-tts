import Form from "@/components/Form";
import AudioPlayer from "@/components/AudioPlayer";

import { LogoTikTok } from "@/components/Logo";

export default function Home() {
  return (
    <main className="container p-4 mx-auto">
      <section className="flex flex-col items-center justify-center">
        <LogoTikTok />
        <div className="flex w-full flex-col gap-6 max-w-md">
          <Form />
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
}
