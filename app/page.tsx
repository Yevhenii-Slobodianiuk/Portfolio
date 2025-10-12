import SnowBackground from "./components/SnowBackground";

import VerticalScrollbar from "./components/VerticalScrollBar";
import Hero from "./sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="h-dvh"></div>
      <section className="bg-neutral-950 py-24 min-h-screen text-neutral-100">
        <div className="gap-8 grid md:grid-cols-3 mx-auto px-8 max-w-6xl">
          <h1 className="md:col-span-2 font-light text-6xl leading-tight">
            Good interfaces don`t shout. They guide, support, and feel natural.
          </h1>
          <div className="space-y-6 text-neutral-400">
            <p>
              I`m Yevhenii — a frontend developer focused on building reliable,
              accessible, and intuitive web interfaces. I enjoy working on
              details that make the experience smoother and more human.
            </p>
            <p>
              I believe the best solutions come from understanding how people
              use things, not just how they look.
            </p>
          </div>
        </div>
      </section>

      <VerticalScrollbar />
      <SnowBackground />
    </main>
  );
}
