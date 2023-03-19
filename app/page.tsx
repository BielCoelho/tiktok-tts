import Form from "@/components/Form";
import "./styles.css";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <main className="container">
      <section className="main">
        <div>logo</div>
        <div className="content">
          <Form />
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
}
