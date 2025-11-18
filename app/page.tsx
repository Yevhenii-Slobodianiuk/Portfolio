import SnowBackground from "./components/SnowBackground";
import VerticalScrollbar from "./components/VerticalScrollBar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Scroll from "./components/Scroll";

export default function Home() {
  return (
    <main>
      <Scroll />
      <Hero />
      <About />
      <Projects />
      <Contact />
      {/* <div className="h-dvh"></div> */}

      <VerticalScrollbar />
      <SnowBackground />
    </main>
  );
}
