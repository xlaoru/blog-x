import { useState, useEffect } from "react";

export const useWindowSequence = (sequence: "innerWidth" | "innerHeight") => {
  const [windowSequence, setWindowSequence] = useState(window[sequence]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSequence(window[sequence]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSequence;
};
