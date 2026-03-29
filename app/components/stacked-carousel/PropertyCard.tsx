"use client";

import { Home, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CarouselCard } from "./types";

export function PropertyCard({ card }: { readonly card: CarouselCard }) {
  return (
    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Purple gradient overlay on right side */}
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-2/5 bg-linear-to-l opacity-20",
          card.gradient,
        )}
      />

      <div className="relative p-6 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
            <p className="text-sm font-medium text-gray-500">{card.subtitle}</p>
          </div>
          {card.verified && (
            <div className="flex items-center justify-center size-10 rounded-full bg-green-100">
              <ShieldCheck className="size-5 text-green-600" />
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${card.progress}%` }}
          />
        </div>

        {/* Description */}
        {card.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {card.description}
          </p>
        )}

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-violet-100 text-violet-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2">
          <Home className="size-6 text-gray-600" />
          <div className="text-right">
            <span className="text-2xl font-bold text-violet-700">
              {card.price}
            </span>
            <span className="text-sm text-violet-500 ml-0.5">
              {card.pricePeriod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
