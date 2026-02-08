"use client";

import { useState } from "react";
import { Search, ChevronRight, Package, MapPin, Box } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AddressItem,
  Container,
  SubAddress,
  NormalAddress,
  ExpandableSearchProps,
} from "./types";
import { mockAddresses } from "./mockData";

export function ExpandableSearch({ onSelect }: ExpandableSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedSubAddress, setSelectedSubAddress] = useState<string | null>(
    null,
  );

  const filteredAddresses = mockAddresses.filter((item) => {
    const matchesItem =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    if (item.type === "container") {
      const matchesSubAddress = item.subAddresses.some(
        (sub) =>
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.code.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return matchesItem || matchesSubAddress;
    }

    return matchesItem;
  });

  const toggleExpand = (itemId: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedIds(newExpanded);
  };

  const handleContainerClick = (container: Container) => {
    setSelectedItemId(container.id);
    setSelectedSubAddress(null);
    toggleExpand(container.id);
    onSelect?.(container);
  };

  const handleNormalAddressClick = (address: NormalAddress) => {
    setSelectedItemId(address.id);
    setSelectedSubAddress(null);
    onSelect?.(address);
  };

  const handleSubAddressClick = (
    e: React.MouseEvent,
    container: Container,
    subAddress: SubAddress,
  ) => {
    e.stopPropagation();
    setSelectedItemId(container.id);
    setSelectedSubAddress(subAddress.id);
    onSelect?.(container, subAddress);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-0">
          {/* Search Input */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search containers or addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results */}
          <ScrollArea className="h-[400px]">
            {filteredAddresses.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No addresses found
              </div>
            ) : (
              <div className="divide-y">
                {filteredAddresses.map((item) =>
                  item.type === "container" ? (
                    <div key={item.id}>
                      {/* Container */}
                      <div
                        onClick={() => handleContainerClick(item)}
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                          selectedItemId === item.id && !selectedSubAddress
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <ChevronRight
                              className={`h-5 w-5 text-muted-foreground transition-transform ${
                                expandedIds.has(item.id) ? "rotate-90" : ""
                              }`}
                            />
                            <Box className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{item.code}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.subAddresses.length} sub-addresses
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Sub-addresses */}
                      {expandedIds.has(item.id) && (
                        <div className="bg-muted/50">
                          {item.subAddresses.map((subAddress) => (
                            <div
                              key={subAddress.id}
                              onClick={(e) =>
                                handleSubAddressClick(e, item, subAddress)
                              }
                              className={`p-4 pl-16 cursor-pointer hover:bg-accent transition-colors border-l-4 ${
                                selectedSubAddress === subAddress.id
                                  ? "border-primary bg-accent"
                                  : "border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium text-sm">
                                    {subAddress.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {subAddress.code}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Normal Address
                    <div
                      key={item.id}
                      onClick={() => handleNormalAddressClick(item)}
                      className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                        selectedItemId === item.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.code}
                          </div>
                        </div>
                        <Badge variant="outline">Address</Badge>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
