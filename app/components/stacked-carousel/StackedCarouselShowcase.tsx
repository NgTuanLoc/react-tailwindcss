"use client";

import { StackedCarousel } from "./StackedCarousel";
import { mockCards } from "./mockData";

export function StackedCarouselShowcase() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-violet-50 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-violet-900">
            Properties
          </h1>
          <p className="text-sm text-violet-500">Swipe to browse listings</p>
        </div>

        <StackedCarousel cards={mockCards} />
      </div>
    </div>
  );
}
