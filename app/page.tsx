import SnowBackground from "./components/SnowBackground";

import VerticalScrollbar from "./components/VerticalScrollBar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="h-dvh"></div>
      <Projects />
      <div className="h-dvh"></div>

      <VerticalScrollbar />
      <SnowBackground />
    </main>
  );
}
