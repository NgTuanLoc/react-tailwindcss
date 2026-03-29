"use client";

import * as React from "react";

export interface UseSwipeStackOptions {
  /** Total number of items */
  readonly total: number;
  /** Minimum drag distance (px) to trigger a swipe */
  readonly threshold?: number;
  /** Enable looping */
  readonly loop?: boolean;
}

export interface UseSwipeStackReturn {
  /** Currently active index */
  current: number;
  /** Whether the user is actively dragging */
  dragging: boolean;
  /** Current horizontal drag offset in px */
  dragOffset: number;
  /** Navigate to a specific index */
  goTo: (index: number) => void;
  /** Pointer event handlers — spread onto the swipe target */
  pointerHandlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: () => void;
    onPointerCancel: () => void;
  };
}

export function useSwipeStack({
  total,
  threshold = 50,
  loop = true,
}: UseSwipeStackOptions): UseSwipeStackReturn {
  const [current, setCurrent] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const startXRef = React.useRef(0);

  const goTo = React.useCallback(
    (index: number) => {
      if (loop) {
        setCurrent(((index % total) + total) % total);
      } else {
        setCurrent(Math.max(0, Math.min(index, total - 1)));
      }
    },
    [total, loop],
  );

  const next = React.useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = React.useCallback(() => goTo(current - 1), [current, goTo]);

  const onPointerDown = React.useCallback((e: React.PointerEvent) => {
    setDragging(true);
    startXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      setDragOffset(e.clientX - startXRef.current);
    },
    [dragging],
  );

  const onPointerUp = React.useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }
    setDragOffset(0);
  }, [dragging, dragOffset, threshold, next, prev]);

  // Keyboard navigation
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    globalThis.addEventListener("keydown", handler);
    return () => globalThis.removeEventListener("keydown", handler);
  }, [next, prev]);

  return {
    current,
    dragging,
    dragOffset,
    goTo,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
