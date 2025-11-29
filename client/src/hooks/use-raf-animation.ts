import { useEffect, useRef, useCallback } from "react";

export function useRAFAnimation(callback: (deltaTime: number) => void) {
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  const animate = useCallback(() => {
    const now = Date.now();
    const deltaTime = (now - lastTimeRef.current) / 1000;
    lastTimeRef.current = now;

    callback(deltaTime);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);
}
