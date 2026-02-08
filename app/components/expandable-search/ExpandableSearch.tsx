"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight, Package, MapPin, Box, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Address, ExpandableSearchProps } from "./types";
import { searchAddresses, getContainerAddresses, getContainerAddressCount } from "./mockApi";

export function ExpandableSearch({ onSelect }: ExpandableSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedContainers, setExpandedContainers] = useState<Map<string, Address[]>>(new Map());
  const [loadingContainers, setLoadingContainers] = useState<Set<string>>(new Set());
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Fetch addresses on search term change
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsSearching(true);
      try {
        const results = await searchAddresses(searchTerm);
        setAddresses(results);
      } catch (error) {
        console.error("Error searching addresses:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchAddresses();
  }, [searchTerm]);

  const handleContainerClick = async (container: Address) => {
    if (container.type !== "container") return;

    setSelectedAddressId(container.id);
    onSelect?.(container);

    // If already expanded, collapse it
    if (expandedContainers.has(container.id)) {
      const newExpanded = new Map(expandedContainers);
      newExpanded.delete(container.id);
      setExpandedContainers(newExpanded);
      return;
    }

    // Fetch nested addresses
    setLoadingContainers((prev) => new Set(prev).add(container.id));
    try {
      const nestedAddresses = await getContainerAddresses(container.id);
      const newExpanded = new Map(expandedContainers);
      newExpanded.set(container.id, nestedAddresses);
      setExpandedContainers(newExpanded);
    } catch (error) {
      console.error("Error fetching container addresses:", error);
    } finally {
      setLoadingContainers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(container.id);
        return newSet;
      });
    }
  };

  const handleAddressClick = (address: Address) => {
    setSelectedAddressId(address.id);
    onSelect?.(address);
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
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
              )}
            </div>
          </div>

          {/* Results */}
          <ScrollArea className="h-[400px]">
            {isSearching && addresses.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                Searching...
              </div>
            ) : addresses.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No addresses found
              </div>
            ) : (
              <div className="divide-y">
                {addresses.map((address) =>
                  address.type === "container" ? (
                    <div key={address.id}>
                      {/* Container */}
                      <div
                        onClick={() => handleContainerClick(address)}
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                          selectedAddressId === address.id
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            {loadingContainers.has(address.id) ? (
                              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                            ) : (
                              <ChevronRight
                                className={`h-5 w-5 text-muted-foreground transition-transform ${
                                  expandedContainers.has(address.id) ? "rotate-90" : ""
                                }`}
                              />
                            )}
                            <Box className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <div className="font-medium">{address.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{address.code}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {getContainerAddressCount(address.id)} sub-addresses
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Nested addresses */}
                      {expandedContainers.has(address.id) && (
                        <div className="bg-muted/50">
                          {expandedContainers.get(address.id)?.map((nestedAddress) => (
                            <div
                              key={nestedAddress.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddressClick(nestedAddress);
                              }}
                              className={`p-4 pl-16 cursor-pointer hover:bg-accent transition-colors border-l-4 ${
                                selectedAddressId === nestedAddress.id
                                  ? "border-primary bg-accent"
                                  : "border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium text-sm">
                                    {nestedAddress.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {nestedAddress.code}
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
                      key={address.id}
                      onClick={() => handleAddressClick(address)}
                      className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                        selectedAddressId === address.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium">{address.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {address.code}
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
