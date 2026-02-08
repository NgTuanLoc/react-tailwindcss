"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExpandableSearch } from "./ExpandableSearch";
import { Address } from "./types";

export function ExpandableSearchShowcase() {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [expandLog, setExpandLog] = useState<Array<{ id: string; message: string }>>([]);

  const handleSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleContainerExpand = (containerId: string) => {
    setExpandLog((prev) => [...prev, { id: Date.now().toString(), message: `Expanded: ${containerId}` }]);
  };

  const handleContainerCollapse = (containerId: string) => {
    setExpandLog((prev) => [...prev, { id: Date.now().toString(), message: `Collapsed: ${containerId}` }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Expandable Search Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search and select containers or addresses - containers load nested addresses dynamically
          </p>
        </div>

        <ExpandableSearch 
          onSelect={handleSelect}
          onContainerExpand={handleContainerExpand}
          onContainerCollapse={handleContainerCollapse}
          placeholder="Search for warehouses, offices, or addresses..."
          scrollHeight="500px"
          showContainerCount={true}
        />

        {/* Selection Display */}
        {selectedAddress && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Current Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {selectedAddress.type === "container"
                      ? "Container:"
                      : "Address:"}
                  </span>
                  <Badge
                    variant={
                      selectedAddress.type === "container"
                        ? "default"
                        : "outline"
                    }
                  >
                    {selectedAddress.type}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">{selectedAddress.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedAddress.code}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Expand/Collapse Log */}
        {expandLog.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Container Events Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {expandLog.slice(-5).reverse().map((entry) => (
                  <div key={entry.id} className="text-sm text-muted-foreground font-mono">
                    {entry.message}
                  </div>
                ))}
              </div>
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
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Fully reusable</strong> with customizable props
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  Built with <strong>shadcn/ui</strong> components
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Mock API</strong> with async data fetching and loading states
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Custom callbacks</strong> for expand/collapse events
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  Support for both <strong>containers</strong> and{" "}
                  <strong>normal addresses</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  Dynamic loading of nested addresses when clicking containers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  Configurable search function and API endpoints
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>
                  Real-time search with loading indicators
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>Dark mode support via theme system</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
