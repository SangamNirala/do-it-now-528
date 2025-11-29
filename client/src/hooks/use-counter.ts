import { useState, useEffect } from "react";

export function useCounter(
  target: number,
  duration: number = 2000,
  shouldStart: boolean = true
) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!shouldStart || target === 0) return;

    let currentValue = 0;
    const incrementPerFrame = target / (duration / 16);
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = Math.floor(target * progress);

      if (newValue !== currentValue) {
        currentValue = newValue;
        setCount(newValue);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, shouldStart]);

  return count;
}
