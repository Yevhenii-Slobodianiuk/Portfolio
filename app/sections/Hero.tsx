"use client";

import Image from "next/image";
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
              <div className="flex items-center gap-2">
                <p className="opacity-70 text-[clamp(1rem,2vw,1rem)] text-center md:text-start">
                  BASED IN BREMEN, GERMANY
                </p>
                <Image
                  src="/images/pin.svg"
                  alt="Location icon"
                  width={20}
                  height={10}
                />
              </div>
              <div className="flex gap-2">
                <a
                  href="https://github.com/Yevhenii-Slobodianiuk"
                  target="_blank"
                  className="social-link"
                >
                  <Image
                    src="/images/github.svg"
                    alt="Location icon"
                    width={20}
                    height={10}
                  />
                </a>
                <a
                  href="https://github.com/Yevhenii-Slobodianiuk"
                  target="_blank"
                  className="social-link"
                >
                  <Image
                    src="/images/linkedin.svg"
                    alt="Location icon"
                    width={20}
                    height={10}
                  />
                </a>
              </div>
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
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                (window as any).lenis?.scrollTo("#contact");
              }}
              className="block bg-white hover:bg-transparent px-4 py-2 border border-amber-50 hover:border-[#F9E84E] rounded-xl text-[#212121] hover:text-white transition duration-300"
            >
              <p>contact me</p>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
