"use client";

// import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AsciiHead from "../components/AsciiHead";
import Container from "../components/Container";
import { useMaskSettings } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskSize } = useMaskSettings();

  useGSAP(() => {
    gsap.set(".mask-wrapper", {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=200%",
        scrub: 2,
        pin: true,
      },
    });

    tl.to(".mask-wrapper", {
      maskSize: maskSize,
      duration: 2,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="relative flex-center bg-[#2E2F39] hero mask-wrapper">
      <Container className="flex flex-col justify-center items-center gap-5 md:gap-0">
        <div className="flex flex-col w-fit">
          <div className="flex md:flex-row flex-col items-center gap-5">
            <AsciiHead />
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-[clamp(1.5rem,5vw,4rem)]">
                YEVHENII SLOBODIANIUK
              </h1>
              <p className="opacity-70 text-[clamp(1rem,2vw,1rem)] text-center md:text-start">
                BASED IN BREMEN, GERMANY
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold text-[#F9E84E] text-[clamp(3rem,10vw,10rem)] text-center uppercase">
            frontend
          </p>
          <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <p className="font-bold text-[clamp(3rem,10vw,10rem)] uppercase">
              developer
            </p>
            <button className="block bg-white hover:bg-transparent px-4 py-2 border border-amber-50 rounded-xl text-[#171717] hover:text-white transition duration-300">
              contact me
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
