"use client";

import { SwipeStack } from "./SwipeStack";
import { PropertyCard } from "./PropertyCard";
import type { CarouselCard } from "./types";

interface StackedCarouselProps {
  readonly cards: CarouselCard[];
  readonly className?: string;
}

/**
 * Pre-wired carousel using PropertyCard.
 * For custom card shapes, use `<SwipeStack>` directly with your own `renderCard`.
 */
export function StackedCarousel({ cards, className }: StackedCarouselProps) {
  return (
    <SwipeStack
      items={cards}
      renderCard={(card) => <PropertyCard card={card} />}
      className={className}
    />
  );
}
