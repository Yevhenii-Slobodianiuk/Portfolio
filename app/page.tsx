// import SnowBackground from "./components/SnowBackground";
import VerticalScrollbar from "./components/VerticalScrollBar";
import Hero from "./sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Hero /> */}
      <div className="h-dvh"></div>

      <VerticalScrollbar />
      {/* <SnowBackground /> */}
    </main>
  );
}
