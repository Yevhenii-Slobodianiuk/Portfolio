"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Scroll = () => {
  useGSAP(() => {
    gsap.to(".scroll", {
      opacity: 0,
      scrollTrigger: {
        trigger: "hero",
        start: "top top",
        end: "300px",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });
  });
  return (
    <div className="bottom-20 left-1/2 z-1000 fixed flex flex-col items-center gap-5 w-5 h-5 scroll">
      <p>SCROLL</p>
      <div className="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Scroll;
