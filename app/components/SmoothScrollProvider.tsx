// "use client";
// import Lenis from "lenis";
// import { useEffect } from "react";

// export default function SmoothScrollProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 2.6,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // плавність
//       smoothWheel: true,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return <>{children}</>;
// }

"use client";
import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Додаємо глобально
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
