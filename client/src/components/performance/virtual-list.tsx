import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  containerClassName?: string;
  overscan?: number;
}

export function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  containerClassName = "",
  overscan = 3,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollTop(container.scrollTop);
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      setContainerHeight(container.clientHeight);
    });

    container.addEventListener("scroll", handleScroll, { passive: true });
    resizeObserver.observe(container);
    setContainerHeight(container.clientHeight);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div ref={containerRef} className={containerClassName} style={{ willChange: "transform" }}>
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        <motion.div
          style={{ transform: `translateY(${offsetY}px)` }}
          initial={false}
        >
          {visibleItems.map((item, idx) => (
            <div
              key={startIndex + idx}
              style={{ height: itemHeight }}
              className="overflow-hidden"
            >
              {renderItem(item, startIndex + idx)}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
