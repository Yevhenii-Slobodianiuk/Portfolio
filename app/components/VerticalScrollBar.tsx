"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function VerticalScrollbar() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          height: `${scrolled}%`,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="top-1/2 right-5 z-[9999] fixed rounded-2xl w-[5px] h-[200px] overflow-hidden"
      style={{
        backgroundColor: "#6F6F6F",
        transform: "translateY(-50%)",
      }}
    >
      <div
        ref={progressRef}
        style={{
          width: "100%",
          height: "0%",
          backgroundColor: "#F9E84E",
        }}
      />
    </div>
  );
}
