"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import type { DropdownItem, SearchableDropdownProps } from "./types";

export function SearchableDropdown({
  placeholder = "Search...",
  onSearch,
  onSelect,
  debounceTime = 500,
  className = "",
  isLoading = false,
  error = null,
}: SearchableDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchQuery, debounceTime);

  // Fetch items when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setItems([]);
      return;
    }

    const fetchItems = async () => {
      try {
        setLoading(true);
        const results = await onSearch(debouncedQuery);
        setItems(results);
      } catch (err) {
        console.error("Error fetching items:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [debouncedQuery, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectItem = (item: DropdownItem) => {
    onSelect(item);
    setSearchQuery("");
    setItems([]);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Loading State */}
          {loading && !isLoading && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              Loading...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="px-4 py-3 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading &&
            !isLoading &&
            items.length === 0 &&
            searchQuery.trim() !== "" && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No results found
              </div>
            )}

          {/* Items List */}
          {items.length > 0 && (
            <ul className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
