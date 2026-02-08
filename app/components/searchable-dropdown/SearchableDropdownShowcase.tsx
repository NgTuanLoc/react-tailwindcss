"use client";

import { useState } from "react";
import { SearchableDropdown } from "./SearchableDropdown";
import type { DropdownItem } from "./types";

// Mock API that simulates fetching products
async function fetchProducts(query: string): Promise<DropdownItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock product database
  const mockProducts = [
    { id: 1, label: "Apple iPhone 15", category: "Electronics" },
    { id: 2, label: "Apple MacBook Pro", category: "Computers" },
    { id: 3, label: "Apple AirPods Pro", category: "Audio" },
    { id: 4, label: "Samsung Galaxy S24", category: "Electronics" },
    { id: 5, label: 'Samsung Monitor 32"', category: "Displays" },
    { id: 6, label: "Sony WH-1000XM5", category: "Audio" },
    { id: 7, label: "Dell XPS 13", category: "Computers" },
    { id: 8, label: 'iPad Pro 12.9"', category: "Tablets" },
    { id: 9, label: "Google Pixel 8", category: "Electronics" },
    { id: 10, label: "Logitech MX Master 3S", category: "Peripherals" },
  ];

  // Filter products based on query
  return mockProducts.filter((product) =>
    product.label.toLowerCase().includes(query.toLowerCase()),
  );
}

export function SearchableDropdownShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<DropdownItem | null>(
    null,
  );

  const handleSelect = (item: DropdownItem) => {
    setSelectedProduct(item);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Searchable Dropdown
          </h1>
          <p className="text-gray-600">
            Search for products with debounced API calls
          </p>
        </div>

        {/* Dropdown Component */}
        <SearchableDropdown
          placeholder="Search for a product..."
          onSearch={fetchProducts}
          onSelect={handleSelect}
          debounceTime={500}
          className="mb-6"
        />

        {/* Selected Item Display */}
        {selectedProduct && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-sm font-semibold text-green-900 mb-2">
              Selected Product
            </h2>
            <div className="space-y-1 text-sm text-green-700">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {selectedProduct.label}
              </p>
              <p>
                <span className="font-medium">ID:</span> {selectedProduct.id}
              </p>
              {selectedProduct.category && (
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {selectedProduct.category as string}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            How it works
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Type to search products</li>
            <li>• Results are debounced (500ms delay)</li>
            <li>• Click outside to close dropdown</li>
            <li>• Selected item displays below</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
