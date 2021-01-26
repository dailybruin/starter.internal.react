import { useState, useEffect } from "react";

const getDeviceConfig = (width: number): string | undefined => {
  if (width < 320) {
    return "xs";
  }
  if (width >= 320 && width < 720) {
    return "sm";
  }
  if (width >= 720 && width < 1024) {
    return "md";
  }
  if (width >= 1024) {
    return "lg";
  }
  return undefined;
};

const useMediaWidth = () => {
  const [brkPnt, setBrkPnt] = useState<string | undefined>(
    getDeviceConfig(window.innerWidth),
  );

  useEffect(() => {
    const calcInnerWidth = () => {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    };

    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return brkPnt;
};
export default useMediaWidth;
