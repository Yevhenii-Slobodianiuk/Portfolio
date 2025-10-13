import SnowBackground from "./components/SnowBackground";

import VerticalScrollbar from "./components/VerticalScrollBar";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <div className="h-dvh"></div>

      <VerticalScrollbar />
      <SnowBackground />
    </main>
  );
}
