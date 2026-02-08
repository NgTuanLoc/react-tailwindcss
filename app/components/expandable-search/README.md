# Expandable Search Component

A fully reusable React component that provides a searchable, hierarchical view of containers and addresses with async data fetching and expand/collapse functionality.

## Features

- **Fully Reusable**: Highly configurable with extensive props for customization
- **Mock API Integration**: Simulates real API calls with async data fetching
- **Custom Functions**: Pass your own search and data fetching functions
- **Event Callbacks**: Track expand/collapse events and selections
- **Search Functionality**: Real-time search across containers and addresses
- **Lazy Loading**: Container nested addresses are loaded only when expanded
- **Two Address Types**:
  - **Containers**: Expandable items that can contain nested addresses
  - **Normal Addresses**: Standalone addresses without nested items
- **Loading States**: Visual feedback during search and data fetching
- **Visual Feedback**: Clear indication of selected items, loading states
- **Dark Mode Support**: Full support for light and dark themes
- **shadcn/ui Components**: Built with beautiful, accessible components

## Basic Usage

```tsx
import { ExpandableSearch } from './components/expandable-search';

function MyComponent() {
  const handleSelect = (address) => {
    console.log('Selected:', address);
  };

  return <ExpandableSearch onSelect={handleSelect} />;
}
```

## Advanced Usage with Custom Props

```tsx
import { ExpandableSearch } from './components/expandable-search';
import { myCustomSearchAPI, myGetContainerAPI } from './api';

function MyComponent() {
  const handleSelect = (address) => {
    console.log('Selected:', address);
  };

  const handleExpand = (containerId) => {
    console.log('Container expanded:', containerId);
  };

  const handleCollapse = (containerId) => {
    console.log('Container collapsed:', containerId);
  };

  return (
    <ExpandableSearch 
      onSelect={handleSelect}
      onContainerExpand={handleExpand}
      onContainerCollapse={handleCollapse}
      searchFunction={myCustomSearchAPI}
      getContainerAddressesFunction={myGetContainerAPI}
      placeholder="Search warehouses and locations..."
      scrollHeight="600px"
      initialSearchTerm=""
      emptyStateMessage="No locations found. Try a different search."
      showContainerCount={true}
      className="my-custom-class"
    />
  );
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | `(address: Address) => void` | - | Callback when an address is selected |
| `onContainerExpand` | `(containerId: string) => void` | - | Callback when a container is expanded |
| `onContainerCollapse` | `(containerId: string) => void` | - | Callback when a container is collapsed |
| `searchFunction` | `(query: string) => Promise<Address[]>` | `searchAddresses` | Custom search function |
| `getContainerAddressesFunction` | `(containerId: string) => Promise<Address[]>` | `getContainerAddresses` | Custom function to fetch nested addresses |
| `getContainerCountFunction` | `(containerId: string) => number` | `getContainerAddressCount` | Custom function to get address count |
| `placeholder` | `string` | `"Search containers..."` | Placeholder text for search input |
| `scrollHeight` | `string` | `"400px"` | Height of the results scroll area |
| `initialSearchTerm` | `string` | `""` | Initial search term |
| `emptyStateMessage` | `string` | `"No addresses found"` | Message shown when no results |
| `showContainerCount` | `boolean` | `true` | Show/hide container count badge |
| `className` | `string` | `""` | Additional CSS classes |

## Data Structure

```typescript
interface Address {
  id: string;
  name: string;
  code: string;
  type: 'container' | 'address';
}
```

## Custom API Integration

Replace the default mock API with your own:

```tsx
// Define your custom search function
const searchMyAPI = async (query: string): Promise<Address[]> => {
  const response = await fetch(`/api/addresses/search?q=${query}`);
  return response.json();
};

// Define your custom container addresses function
const getMyContainerAddresses = async (containerId: string): Promise<Address[]> => {
  const response = await fetch(`/api/containers/${containerId}/addresses`);
  return response.json();
};

// Use with the component
<ExpandableSearch
  searchFunction={searchMyAPI}
  getContainerAddressesFunction={getMyContainerAddresses}
/>
```

## Demo

Use the `ExpandableSearchShowcase` component to see all features in action:

```tsx
import { ExpandableSearchShowcase } from './components/expandable-search';

export default function Page() {
  return <ExpandableSearchShowcase />;
}
```

## How It Works

1. **Initial Load**: Component calls `searchFunction("")` to load all addresses
2. **Search**: As user types, `searchFunction(query)` is called with debounced search
3. **Container Click**: 
   - Calls `getContainerAddressesFunction(containerId)` to fetch nested addresses
   - Triggers `onContainerExpand(containerId)` callback
   - Shows loading spinner during fetch
4. **Collapse**: 
   - Removes nested addresses from view
   - Triggers `onContainerCollapse(containerId)` callback
5. **Selection**: Clicking any address triggers `onSelect(address)` callback

## Mock Data

Includes realistic data representing:

- Standalone addresses (offices, parking lots, customer pickup points)
- Warehouses with aisles and shelves
- Distribution centers with loading docks and storage areas
- Retail stores with floor sections

## Production Usage

For production, replace the mock API functions with your actual API endpoints:

```tsx
import { ExpandableSearch } from './components/expandable-search';

const searchProductionAPI = async (query: string) => {
  const res = await fetch(`https://api.example.com/search?q=${query}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};

const getContainerData = async (id: string) => {
  const res = await fetch(`https://api.example.com/containers/${id}`);
  if (!res.ok) throw new Error('Failed to load container');
  return res.json();
};

export function MyApp() {
  return (
    <ExpandableSearch
      searchFunction={searchProductionAPI}
      getContainerAddressesFunction={getContainerData}
      onSelect={(addr) => console.log('Selected:', addr)}
    />
  );
}
```

## TypeScript Support

The component is fully typed with TypeScript. All props and data structures have complete type definitions.

```typescript
import type { Address, AddressType, ExpandableSearchProps } from './components/expandable-search';
```
