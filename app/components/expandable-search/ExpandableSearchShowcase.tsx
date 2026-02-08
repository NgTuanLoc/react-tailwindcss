"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExpandableSearch } from "./ExpandableSearch";
import { AddressItem, SubAddress } from "./types";

export function ExpandableSearchShowcase() {
  const [selection, setSelection] = useState<{
    item: AddressItem | null;
    subAddress: SubAddress | null;
  }>({
    item: null,
    subAddress: null,
  });

  const handleSelect = (item: AddressItem, subAddress?: SubAddress) => {
    setSelection({
      item,
      subAddress: subAddress || null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Expandable Search Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Click on containers to expand and view sub-addresses
          </p>
        </div>

        <ExpandableSearch onSelect={handleSelect} />

        {/* Selection Display */}
        {selection.item && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Current Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {selection.item.type === "container"
                      ? "Container:"
                      : "Address:"}
                  </span>
                  <Badge
                    variant={
                      selection.item.type === "container"
                        ? "default"
                        : "outline"
                    }
                  >
                    {selection.item.type}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">{selection.item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {selection.item.code}
                  </div>
                </div>
              </div>
              {selection.subAddress && (
                <div className="space-y-2 pt-2 border-t">
                  <span className="text-sm font-medium text-muted-foreground">
                    Sub-Address:
                  </span>
                  <div>
                    <div className="font-medium">
                      {selection.subAddress.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selection.subAddress.code}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Features List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Built with <strong>shadcn/ui</strong> components
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Support for both <strong>containers</strong> and{" "}
                  <strong>normal addresses</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Search through containers, addresses, and sub-addresses
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Click containers to expand/collapse sub-addresses</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Visual feedback with badges and hover effects</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Dark mode support via theme system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Real-time filtering with lucide-react icons</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
