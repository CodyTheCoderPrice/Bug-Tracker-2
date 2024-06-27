import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

type TWindowSize = {
  width: number;
  height: number;
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<TWindowSize>(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
