"use client";
import { useState, useEffect } from "react";

const useSmallScreen = (maxWidth = 768) => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= maxWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return isSmallScreen;
};

export default useSmallScreen;
