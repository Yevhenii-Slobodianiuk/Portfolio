"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Container from "../components/Container";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const movingNumberRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);

  useGSAP(() => {
    const container = projectsContainerRef.current;
    const movingNumber = movingNumberRef.current;
    const projects = gsap.utils.toArray<HTMLDivElement>(".project");

    if (!container || !movingNumber || projects.length === 0) return;

    gsap.to(movingNumber, {
      y: () => container.clientHeight - movingNumber.clientHeight,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom center",
        scrub: 1,
        onUpdate: () => {
          const centerY =
            movingNumber.getBoundingClientRect().top +
            movingNumber.clientHeight / 2;

          projects.forEach((project, i) => {
            const rect = project.getBoundingClientRect();
            if (centerY >= rect.top && centerY <= rect.bottom) {
              setActiveIndex(i + 1);
            }
          });
        },
      },
    });
  }, []);

  return (
    <section className="bg-[#2E2F39] py-[100px] w-full h-full">
      <Container>
        <h2 className="mb-[100px] font-semibold text-[64px] text-center uppercase">
          projects
        </h2>

        <div
          ref={projectsContainerRef}
          className="relative flex flex-col gap-20 mt-[100px] projects"
        >
          <div
            ref={movingNumberRef}
            className="top-0 left-0 absolute text-white moving-num"
          >
            <span className="font-bold text-[128px]">0{activeIndex}</span>
          </div>

          <p className="bottom-5 left-5 z-50 fixed text-white text-lg">
            Active Project: {activeIndex}
          </p>

          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex project">
              <div className="hidden lg:block flex-1"></div>
              <div className="flex-1">
                <div className="bg-amber-200 w-full h-[90vh]"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
