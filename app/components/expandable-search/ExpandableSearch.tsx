"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  ChevronRight,
  Package,
  MapPin,
  Box,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Address, ExpandableSearchProps } from "./types";
import {
  searchAddresses,
  getContainerAddresses,
  getContainerAddressCount,
} from "./mockApi";

export function ExpandableSearch({
  onSelect,
  onContainerExpand,
  onContainerCollapse,
  searchFunction = searchAddresses,
  getContainerAddressesFunction = getContainerAddresses,
  getContainerCountFunction = getContainerAddressCount,
  placeholder = "Search containers or addresses...",
  scrollHeight = "400px",
  initialSearchTerm = "",
  emptyStateMessage = "No addresses found",
  showContainerCount = true,
  className = "",
}: Readonly<ExpandableSearchProps>) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedContainers, setExpandedContainers] = useState<
    Map<string, Address[]>
  >(new Map());
  const [loadingContainers, setLoadingContainers] = useState<Set<string>>(
    new Set(),
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  // Fetch addresses on search term change
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsSearching(true);
      try {
        const results = await searchFunction(searchTerm);
        setAddresses(results);
      } catch (error) {
        console.error("Error searching addresses:", error);
      } finally {
        setIsSearching(false);
      }
    };

    void fetchAddresses();
  }, [searchTerm, searchFunction]);

  const handleContainerClick = useCallback(
    async (container: Address) => {
      if (container.type !== "container") return;

      setSelectedAddressId(container.id);
      onSelect?.(container);

      // If already expanded, collapse it
      if (expandedContainers.has(container.id)) {
        const newExpanded = new Map(expandedContainers);
        newExpanded.delete(container.id);
        setExpandedContainers(newExpanded);
        onContainerCollapse?.(container.id);
        return;
      }

      // Fetch nested addresses
      setLoadingContainers((prev) => new Set(prev).add(container.id));
      try {
        const nestedAddresses =
          await getContainerAddressesFunction(container.id);
        const newExpanded = new Map(expandedContainers);
        newExpanded.set(container.id, nestedAddresses);
        setExpandedContainers(newExpanded);
        onContainerExpand?.(container.id);
      } catch (error) {
        console.error("Error fetching container addresses:", error);
      } finally {
        setLoadingContainers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(container.id);
          return newSet;
        });
      }
    },
    [
      expandedContainers,
      getContainerAddressesFunction,
      onSelect,
      onContainerExpand,
      onContainerCollapse,
    ],
  );

  const handleAddressClick = useCallback(
    (address: Address) => {
      setSelectedAddressId(address.id);
      onSelect?.(address);
    },
    [onSelect],
  );

  const handleContainerKeyDown = useCallback(
    (e: React.KeyboardEvent, address: Address) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        void handleContainerClick(address);
      }
    },
    [handleContainerClick],
  );

  const handleAddressKeyDown = useCallback(
    (e: React.KeyboardEvent, address: Address) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleAddressClick(address);
      }
    },
    [handleAddressClick],
  );

  const renderLoadingState = () => (
    <div className="p-8 text-center text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
      Searching...
    </div>
  );

  const renderEmptyState = () => (
    <div className="p-8 text-center text-muted-foreground">
      {emptyStateMessage}
    </div>
  );

  const renderResults = () => (
    <div className="divide-y">
      {addresses.map((address) =>
        address.type === "container"
          ? renderContainer(address)
          : renderNormalAddress(address),
      )}
    </div>
  );

  const renderContainer = (address: Address) => (
    <div key={address.id}>
      {/* Container */}
      <button
        type="button"
        onClick={() => void handleContainerClick(address)}
        onKeyDown={(e) => handleContainerKeyDown(e, address)}
        className={`w-full text-left p-4 hover:bg-accent transition-colors ${
          selectedAddressId === address.id ? "bg-accent" : ""
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
                {showContainerCount && (
                  <Badge variant="secondary" className="text-xs">
                    {getContainerCountFunction(address.id)} sub-addresses
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Package className="h-5 w-5 text-muted-foreground" />
        </div>
      </button>

      {/* Nested addresses */}
      {expandedContainers.has(address.id) && (
        <div className="bg-muted/50">
          {expandedContainers.get(address.id)?.map((nestedAddress) => (
            <button
              key={nestedAddress.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddressClick(nestedAddress);
              }}
              onKeyDown={(e) => handleAddressKeyDown(e, nestedAddress)}
              className={`w-full text-left p-4 pl-16 hover:bg-accent transition-colors border-l-4 ${
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
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderNormalAddress = (address: Address) => (
    <button
      key={address.id}
      type="button"
      onClick={() => handleAddressClick(address)}
      onKeyDown={(e) => handleAddressKeyDown(e, address)}
      className={`w-full text-left p-4 hover:bg-accent transition-colors ${
        selectedAddressId === address.id ? "bg-accent" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <div className="font-medium">{address.name}</div>
          <div className="text-sm text-muted-foreground">{address.code}</div>
        </div>
        <Badge variant="outline">Address</Badge>
      </div>
    </button>
  );

  const renderContent = () => {
    if (isSearching && addresses.length === 0) {
      return renderLoadingState();
    }

    if (addresses.length === 0) {
      return renderEmptyState();
    }

    return renderResults();
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <Card>
        <CardContent className="p-0">
          {/* Search Input */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={placeholder}
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
          <ScrollArea style={{ height: scrollHeight }}>
            {renderContent()}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
