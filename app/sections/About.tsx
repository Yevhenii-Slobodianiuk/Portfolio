"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Container from "../components/Container";

const headingText =
  "I believe in keeping things simple. Every interface should be easy to understand and pleasant to use. I focus on clarity, small details, and a consistent experience across devices.";

const About = () => {
  const headingCharsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    gsap.set(headingCharsRef.current, { opacity: 0.2 });
    gsap.set(".fade-in", {
      opacity: 0,
      y: 100,
    });

    gsap.to(headingCharsRef.current, {
      opacity: 1,
      duration: 0.2,
      stagger: 0.1,
      scrollTrigger: {
        trigger: headingCharsRef.current,
        start: "top 95%",
        end: "bottom center",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    });

    gsap.to(".fade-in", {
      opacity: 1,
      y: 0,
      duration: 2,
      scrollTrigger: {
        trigger: ".fade-in",
        start: "top 90%",
        end: "top center",
        scrub: 2,
      },
    });
  });

  return (
    <section className="flex-center bg-[#2E2F39] w-full h-dvh">
      <Container className="flex flex-col gap-10">
        <p className="text-[clamp(1.5rem,5vw,4rem)] whitespace-pre-line">
          {headingText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  ref={(el) => {
                    if (el) headingCharsRef.current.push(el);
                  }}
                  className="inline-block"
                >
                  {char}
                </span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </p>

        <div>
          <p className="opacity-80 text-[1rem] uppercase">this is me</p>
          <div className="bg-[#D9D9D9] opacity-50 my-10 w-full h-[2px]" />
          <div className="flex md:flex-row flex-col items-start gap-10 md:gap-[clamp(3rem,10vw,10rem)] w-fit md:">
            <p className="font-semibold text-[clamp(1.5rem,5vw,4rem)] text-center fade-in">
              Hi, I`m Yevhenii
            </p>
            <p className="md:max-w-[600px] xl:max-w-[700px] text-[clamp(1rem,1.5vw,1.5rem)] fade-in">
              Full-stack developer with 2 years of hands-on experience building
              end-to-end web applications. Specialized in developing responsive
              frontends with React, TypeScript, and Tailwind CSS, and backend
              services using Node.js and Express.js. Delivered landing pages,
              MVPs, and small-to-medium scale web platforms with REST APIs and
              server-side logic. Known for writing clean, maintainable code,
              structuring scalable application architecture, and collaborating
              efficiently in fast-paced remote teams. Consistently meet delivery
              deadlines and product requirements. Focused on performance, code
              quality, and continuous improvement of both frontend and backend
              skills.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
