"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedArrow() {
  useGSAP(() => {
    // Отримуємо всі лінії
    const lines = gsap.utils.toArray("svg line") as SVGLineElement[];

    // Для кожної лінії: розрахунок довжини і початковий стан
    lines.forEach((line) => {
      const length = Math.hypot(
        line.x2.baseVal.value - line.x1.baseVal.value,
        line.y2.baseVal.value - line.y1.baseVal.value
      );
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
    });

    // Створюємо timeline для послідовного малювання
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      repeat: -1, // нескінченне повторення
      yoyo: true, // якщо хочете, щоб анімація поверталася назад
    });

    // Анімація кожної лінії по черзі
    lines.forEach((line, i) => {
      tl.to(
        line,
        {
          strokeDashoffset: 0,
          duration: 1,
        },
        i * 0.15
      );
    });
  });

  return (
    <svg
      width="133"
      height="48"
      viewBox="0 0 133 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="-0.5"
        x2="71.1592"
        y2="-0.5"
        transform="matrix(0.927381 0.374119 -0.0768422 0.997043 1 21)"
        stroke="white"
        strokeWidth="2"
      />
      <line
        y1="-0.5"
        x2="71.1592"
        y2="-0.5"
        transform="matrix(0.927381 0.374119 -0.0768422 0.997043 1 1)"
        stroke="white"
        strokeWidth="2"
      />
      <line
        x1="0.937"
        y1="21"
        x2="0.937"
        y2="1"
        stroke="white"
        strokeWidth="2"
      />
      {/* <line
        x1="66.5"
        y1="47"
        x2="66.5"
        y2="27"
        stroke="white"
        strokeWidth="2"
      /> */}
      {/* <line
        x1="67.5"
        y1="47"
        x2="67.5"
        y2="27"
        stroke="white"
        strokeWidth="2"
      /> */}
      <line
        x1="132.5"
        y1="21"
        x2="132.5"
        y2="1"
        stroke="white"
        strokeWidth="2"
      />
      <line
        y1="-0.5"
        x2="71.1592"
        y2="-0.5"
        transform="matrix(0.927381 -0.374119 0.0768422 0.997043 67 47.6221)"
        stroke="white"
        strokeWidth="2"
      />
      <line
        y1="-0.5"
        x2="71.1592"
        y2="-0.5"
        transform="matrix(0.927381 -0.374119 0.0768422 0.997043 67 27.6221)"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}
