"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Container from "../components/Container";

gsap.registerPlugin(ScrollTrigger);

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
  // {
  //   id: 3,
  //   imageSrc: "/images/project-images/immersive-people.webp",
  //   link: "https://immersive-people.netlify.app/",
  //   technologies: [
  //     {
  //       name: "Next",
  //       iconSrc: "/tech-icons/next.js.svg",
  //     },
  //     {
  //       name: "TypeScript",
  //       iconSrc: "/tech-icons/typescript.svg",
  //     },
  //     {
  //       name: "GSAP",
  //       iconSrc: "/tech-icons/gsap.svg",
  //     },
  //     {
  //       name: "VS Code",
  //       iconSrc: "/tech-icons/visualstudio.svg",
  //     },
  //   ],
  // },
];

const Projects = () => {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const movingNumberRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [hovered, setHovered] = useState<boolean>(false);

  useGSAP(() => {
    const container = projectsContainerRef.current;
    const movingNumber = movingNumberRef.current;
    const projects = gsap.utils.toArray<HTMLDivElement>(".project");

    if (!container || !movingNumber || projects.length === 0) return;

    const anim = gsap.to(movingNumber, {
      y: () => container.clientHeight - movingNumber.clientHeight,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom 85%",
        scrub: 1,
        invalidateOnRefresh: true,
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

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  useGSAP(() => {
    const techBlocks = gsap.utils.toArray<HTMLDivElement>(".technologie-group");

    techBlocks.forEach((group) => {
      const techItems = group.querySelectorAll(".technologie");

      gsap.set(techItems, {
        opacity: 0,
        y: 50,
      });

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

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 50,
        y: e.clientY - 50,
        duration: 0.2,
        ease: "power3.out",
      });
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
                    <img
                      src={project.imageSrc}
                      alt="Filmera image"
                      className="rounded-2xl w-full object-contain"
                    />
                  </a>

                  <div className="technologie-group flex flex-wrap gap-4">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 px-4 py-2 border rounded-xl w-fit technologie"
                      >
                        <img
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
