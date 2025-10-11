import React from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
