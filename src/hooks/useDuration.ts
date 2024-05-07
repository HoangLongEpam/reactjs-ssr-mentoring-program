import { useCallback } from "react";

export const useDuration = () => {
  const d = useCallback((duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return {
      hours,
      minutes,
    };
  }, []);

  return {d};
};
