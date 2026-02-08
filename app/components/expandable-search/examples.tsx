/**
 * Usage Examples for ExpandableSearch Component
 * 
 * This file demonstrates different ways to use the ExpandableSearch component
 * with various prop configurations.
 */

import { ExpandableSearch } from './ExpandableSearch';
import type { Address } from './types';

// Example 1: Basic Usage
export function BasicExample() {
  return (
    <ExpandableSearch 
      onSelect={(address) => console.log('Selected:', address)}
    />
  );
}

// Example 2: Custom Placeholder and Height
export function CustomStyledExample() {
  return (
    <ExpandableSearch 
      placeholder="Find your warehouse location..."
      scrollHeight="600px"
      className="shadow-xl"
      onSelect={(address) => console.log('Selected:', address)}
    />
  );
}

// Example 3: With Event Callbacks
export function WithCallbacksExample() {
  const handleExpand = (containerId: string) => {
    console.log('Container expanded:', containerId);
    // Track analytics, update UI, etc.
  };

  const handleCollapse = (containerId: string) => {
    console.log('Container collapsed:', containerId);
  };

  const handleSelect = (address: Address) => {
    console.log('Address selected:', address);
    // Navigate to address detail page, update form, etc.
  };

  return (
    <ExpandableSearch 
      onSelect={handleSelect}
      onContainerExpand={handleExpand}
      onContainerCollapse={handleCollapse}
    />
  );
}

// Example 4: With Custom Search Function
export function CustomSearchExample() {
  const customSearch = async (query: string): Promise<Address[]> => {
    // Call your own API
    const response = await fetch(`/api/locations?search=${encodeURIComponent(query)}`);
    return response.json();
  };

  return (
    <ExpandableSearch 
      searchFunction={customSearch}
      emptyStateMessage="No locations found. Try adjusting your search."
    />
  );
}

// Example 5: With Custom Container Data Function
export function CustomContainerDataExample() {
  const getContainerData = async (containerId: string): Promise<Address[]> => {
    const response = await fetch(`/api/containers/${containerId}/addresses`);
    return response.json();
  };

  const getCount = (containerId: string): number => {
    // Return cached count or 0
    return 0;
  };

  return (
    <ExpandableSearch 
      getContainerAddressesFunction={getContainerData}
      getContainerCountFunction={getCount}
      showContainerCount={true}
    />
  );
}

// Example 6: Hide Container Count
export function NoCountExample() {
  return (
    <ExpandableSearch 
      showContainerCount={false}
      onSelect={(address) => console.log(address)}
    />
  );
}

// Example 7: With Initial Search Term
export function PrefilledSearchExample() {
  return (
    <ExpandableSearch 
      initialSearchTerm="warehouse"
      placeholder="Search warehouses..."
    />
  );
}

// Example 8: Fully Custom Configuration
export function FullyCustomExample() {
  const mySearch = async (query: string): Promise<Address[]> => {
    const res = await fetch(`/api/search?q=${query}`);
    return res.json();
  };

  const myGetContainer = async (id: string): Promise<Address[]> => {
    const res = await fetch(`/api/containers/${id}`);
    return res.json();
  };

  const myGetCount = (id: string): number => {
    // Your custom logic
    return 0;
  };

  return (
    <ExpandableSearch 
      searchFunction={mySearch}
      getContainerAddressesFunction={myGetContainer}
      getContainerCountFunction={myGetCount}
      onSelect={(addr) => console.log('Selected:', addr)}
      onContainerExpand={(id) => console.log('Expanded:', id)}
      onContainerCollapse={(id) => console.log('Collapsed:', id)}
      placeholder="Search all locations..."
      scrollHeight="500px"
      initialSearchTerm=""
      emptyStateMessage="No results found"
      showContainerCount={true}
      className="my-4 mx-auto max-w-4xl"
    />
  );
}
