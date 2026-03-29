"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSwipeStack } from "./useSwipeStack";

export interface SwipeStackItem {
  /** Unique identifier for keying */
  readonly id: string | number;
}

export interface SwipeStackProps<T extends SwipeStackItem> {
  /** Array of items to display in the stack */
  readonly items: T[];
  /** Render function for each card — receives the item and whether it's the top card */
  readonly renderCard: (item: T, isActive: boolean) => React.ReactNode;
  /** How many cards are visible in the stack */
  readonly visibleCount?: number;
  /** Vertical offset between stacked cards in px */
  readonly stackOffset?: number;
  /** Horizontal offset per layer in px (negative = skew left) */
  readonly skewOffset?: number;
  /** Scale reduction per stack layer (e.g. 0.05 = 5% smaller) */
  readonly scaleStep?: number;
  /** Opacity reduction per stack layer */
  readonly opacityStep?: number;
  /** Swipe threshold in px */
  readonly swipeThreshold?: number;
  /** Enable looping */
  readonly loop?: boolean;
  /** Show dot indicators */
  readonly showIndicators?: boolean;
  /** Active indicator class */
  readonly activeIndicatorClass?: string;
  /** Inactive indicator class */
  readonly inactiveIndicatorClass?: string;
  readonly className?: string;
}

export function SwipeStack<T extends SwipeStackItem>({
  items,
  renderCard,
  visibleCount = 3,
  stackOffset = 14,
  skewOffset = -6,
  scaleStep = 0.04,
  opacityStep = 0.15,
  swipeThreshold = 50,
  loop = true,
  showIndicators = true,
  activeIndicatorClass = "w-5 bg-violet-600",
  inactiveIndicatorClass = "w-3 bg-violet-300 hover:bg-violet-400",
  className,
}: SwipeStackProps<T>) {
  const total = items.length;
  const { current, dragging, dragOffset, goTo, pointerHandlers } =
    useSwipeStack({
      total,
      threshold: swipeThreshold,
      loop,
    });

  // Measure top card height so behind cards can match it
  const topCardRef = React.useRef<HTMLDivElement>(null);
  const [topCardHeight, setTopCardHeight] = React.useState<number | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const el = topCardRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setTopCardHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [current]);

  // Build the visible stack
  const stack = React.useMemo(() => {
    const result: { item: T; stackIndex: number }[] = [];
    for (let i = 0; i < Math.min(visibleCount, total); i++) {
      const itemIndex = (current + i) % total;
      result.push({ item: items[itemIndex], stackIndex: i });
    }
    return result;
  }, [current, items, total, visibleCount]);

  return (
    <div className={cn("w-full select-none", className)}>
      {/* Stack */}
      <div
        className="relative w-full"
        style={{ marginBottom: (visibleCount - 1) * stackOffset }}
        {...pointerHandlers}
      >
        {stack
          .slice()
          .reverse()
          .map(({ item, stackIndex }) => {
            const isTop = stackIndex === 0;
            const scale = 1 - stackIndex * scaleStep;
            const yOffset = stackIndex * stackOffset;
            const xSkew = stackIndex * skewOffset;
            const opacity = 1 - stackIndex * opacityStep;

            return (
              <div
                key={item.id}
                ref={isTop ? topCardRef : undefined}
                className={cn(
                  "touch-pan-y origin-top",
                  isTop
                    ? "relative"
                    : "absolute inset-x-0 top-0 overflow-hidden",
                  isTop
                    ? "cursor-grab active:cursor-grabbing"
                    : "pointer-events-none",
                  dragging && isTop
                    ? "transition-none"
                    : "transition-all duration-300 ease-out",
                )}
                style={{
                  zIndex: visibleCount - stackIndex,
                  transform: isTop
                    ? `translateX(${dragOffset}px)`
                    : `translateY(${yOffset}px) translateX(${xSkew}px) scale(${scale})`,
                  opacity,
                  ...(!isTop && topCardHeight !== undefined
                    ? { height: topCardHeight }
                    : {}),
                }}
              >
                {renderCard(item, isTop)}
              </div>
            );
          })}
      </div>

      {/* Indicators */}
      {showIndicators && (
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === current
                  ? activeIndicatorClass
                  : inactiveIndicatorClass,
              )}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
