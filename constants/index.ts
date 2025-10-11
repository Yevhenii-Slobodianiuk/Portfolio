import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskPos: "50% 50%",
      initialMaskSize: "80% 80%",
      maskPos: "50% 50%",
      maskSize: "4100% 4100%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% 50%",
      initialMaskSize: "50% 50%",
      maskPos: "50% 50%",
      maskSize: "4700% 4700%",
    };
  }

  return {
    initialMaskPos: "50% 50%",
    initialMaskSize: "30% 30%",
    maskPos: "50% 50%",
    maskSize: "5000% 5000%",
  };
};
