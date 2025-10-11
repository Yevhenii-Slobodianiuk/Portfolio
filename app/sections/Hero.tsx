// import AnimatedArrow from "../components/AnimatedArrow";
import AsciiHead from "../components/AsciiHead";
import Container from "../components/Container";

const Hero = () => {
  return (
    <section className="flex-center hero">
      <Container className="flex flex-col justify-center items-center gap-5 md:gap-0">
        <div className="flex flex-col w-fit">
          <div className="flex md:flex-row flex-col items-center gap-5">
            <AsciiHead />
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-[clamp(1.5rem,5vw,4rem)]">
                YEVHENII SLOBODIANIUK
              </h1>
              <p className="text-[clamp(1rem,2vw,1.5rem)] text-center md:text-start">
                BASED IN BREMEN, GERMANY
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold text-[clamp(3rem,10vw,10rem)] text-center uppercase">
            frontend
          </p>
          <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <p className="font-bold text-[clamp(3rem,10vw,10rem)] uppercase">
              developer
            </p>
            <button className="block hover:bg-white hover:opacity-70 px-4 py-2 border border-amber-50 rounded-xl hover:text-[#171717] transition duration-300">
              contact me
            </button>
          </div>
        </div>
        {/* <AnimatedArrow /> */}
      </Container>
    </section>
  );
};

export default Hero;
