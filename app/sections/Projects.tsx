"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Container from "../components/Container";

gsap.registerPlugin(ScrollTrigger);
type Range = { top: number; bottom: number; index: number };

const projects = [
  {
    id: 1,
    imageSrc: "/images/project-images/filmera.webp",
    link: "https://filmera-y-s.netlify.app/",
    technologies: [
      {
        name: "React",
        iconSrc: "/tech-icons/react.svg",
      },
      {
        name: "JavaScript",
        iconSrc: "/tech-icons/javascript.svg",
      },
      {
        name: "Redux toolkit",
        iconSrc: "/tech-icons/redux.svg",
      },
      {
        name: "VS Code",
        iconSrc: "/tech-icons/visualstudio.svg",
      },
    ],
  },
  {
    id: 2,
    imageSrc: "/images/project-images/gtavi.webp",
    link: "https://gtavi-landing.netlify.app/",
    technologies: [
      {
        name: "React",
        iconSrc: "/tech-icons/react.svg",
      },
      {
        name: "TypeScript",
        iconSrc: "/tech-icons/typescript.svg",
      },
      {
        name: "GSAP",
        iconSrc: "/tech-icons/gsap.svg",
      },
      {
        name: "Vite",
        iconSrc: "/tech-icons/vite.js.svg",
      },
      {
        name: "VS Code",
        iconSrc: "/tech-icons/visualstudio.svg",
      },
    ],
  },
];

const Projects = () => {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const movingNumberRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [hovered, setHovered] = useState<boolean>(false);

  useGSAP(
    () => {
      const container = projectsContainerRef.current;
      const movingNumber = movingNumberRef.current;
      if (!container || !movingNumber) return;

      const projectEls = gsap.utils.toArray<HTMLDivElement>(".project");
      if (!projectEls.length) return;

      let ranges: Range[] = [];
      let maxY = 0;
      let numH = 0;

      const compute = () => {
        maxY = container.clientHeight - movingNumber.clientHeight;
        if (maxY < 0) maxY = 0;

        numH = movingNumber.clientHeight;

        ranges = projectEls.map((el, i) => {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          return { top, bottom, index: i + 1 };
        });
      };

      const currentIndex = { v: 1 };
      const setIndex = (i: number) => {
        if (currentIndex.v !== i) {
          currentIndex.v = i;
          setActiveIndex(i);
        }
      };

      compute();

      const tween = gsap.to(movingNumber, {
        y: () => maxY,
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom 85%",
          scrub: 1,
          invalidateOnRefresh: true,

          onRefreshInit: () => {
            compute();
          },

          onRefresh: (self) => {
            const y = self.progress * maxY;
            const center = y + numH / 2;
            const hit = ranges.find(
              (r) => center >= r.top && center <= r.bottom
            );
            if (hit) setIndex(hit.index);
          },

          onUpdate: (self) => {
            const y = self.progress * maxY;
            const center = y + numH / 2;

            for (let i = 0; i < ranges.length; i++) {
              const r = ranges[i];
              if (center >= r.top && center <= r.bottom) {
                setIndex(r.index);
                break;
              }
            }
          },
        },
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      document.fonts?.ready?.then(() => ScrollTrigger.refresh());

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("load", onLoad);
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [] }
  );

  useGSAP(() => {
    const techBlocks = gsap.utils.toArray<HTMLDivElement>(".technologie-group");
    techBlocks.forEach((group) => {
      const techItems = group.querySelectorAll(".technologie");
      gsap.set(techItems, { opacity: 0, y: 50 });
      gsap.to(techItems, {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power1.inOut",
        stagger: 0.5,
        scrollTrigger: {
          trigger: group,
          start: "top bottom",
          end: "top 75%",
          scrub: 2,
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3.out",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX - 50);
      yTo(e.clientY - 50);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <section className="bg-[#2E2F39] py-[100px] w-full h-full">
      <Container>
        <h2 className="mb-[100px] font-semibold text-[clamp(3rem,8vw,8rem)] text-center uppercase">
          projects
        </h2>

        <div
          ref={projectsContainerRef}
          className="relative flex flex-col gap-20 mt-[100px] projects"
        >
          <div
            ref={movingNumberRef}
            className="top-0 right-0 lg:left-0 z-10 absolute pointer-events-none moving-num"
          >
            <span className="opacity-80 font-bold text-[#F9E84E] text-[clamp(4rem,10vw,10rem)]">
              0{activeIndex}
            </span>
          </div>

          <div
            ref={cursorRef}
            className={`top-0 left-0 z-5 fixed flex-center bg-amber-500 rounded-full w-25 h-25 mix-blend-difference cursor-none pointer-events-none transition-opacity duration-300 hidden lg:block ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="font-bold text-black">VIEW</p>
          </div>

          {projects.map((project) => (
            <div key={project.id} className="flex project">
              <div className="hidden lg:block flex-1"></div>
              <div className="flex-2">
                <div className="flex flex-col gap-5 w-full">
                  <a
                    target="_blank"
                    href={project.link}
                    className="relative cursor-none"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <Image
                      width={918}
                      height={487}
                      src={project.imageSrc}
                      alt="Filmera image"
                      className="rounded-2xl w-full object-contain"
                    />
                    {/* <img
                      src={project.imageSrc}
                      alt="Filmera image"
                      className="rounded-2xl w-full object-contain"
                    /> */}
                  </a>

                  <div className="technologie-group flex flex-wrap gap-4">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 px-4 py-2 border rounded-xl w-fit technologie"
                      >
                        <Image
                          width={30}
                          height={30}
                          src={tech.iconSrc}
                          alt="react"
                          className="w-[30px] h-[30px]"
                        />
                        <p>{tech.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
