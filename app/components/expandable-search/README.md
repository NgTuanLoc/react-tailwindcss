# Expandable Search Component

A React component that provides a searchable, hierarchical view of containers and addresses with async data fetching and expand/collapse functionality.

## Features

- **Mock API Integration**: Simulates real API calls with async data fetching
- **Search Functionality**: Real-time search across containers and addresses
- **Lazy Loading**: Container nested addresses are loaded only when expanded
- **Two Address Types**:
  - **Containers**: Expandable items that can contain nested addresses
  - **Normal Addresses**: Standalone addresses without nested items
- **Loading States**: Visual feedback during search and data fetching
- **Visual Feedback**: Clear indication of selected items, loading states
- **Dark Mode Support**: Full support for light and dark themes
- **shadcn/ui Components**: Built with beautiful, accessible components

## Usage

```tsx
import { ExpandableSearch } from './components/expandable-search';

function MyComponent() {
  const handleSelect = (address) => {
    console.log('Selected:', address);
    // address.type will be either 'container' or 'address'
  };

  return <ExpandableSearch onSelect={handleSelect} />;
}
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

1. **Initial Search**: When you type in the search box, the component calls `searchAddresses()` API
2. **Container Click**: When you click a container, it calls `getContainerAddresses(containerId)` to fetch nested addresses
3. **Loading States**: Shows loading spinners during API calls
4. **Normal Addresses**: Clicking standalone addresses immediately selects them

## Data Structure

```typescript
interface Address {
  id: string;
  name: string;
  code: string;
  type: 'container' | 'address';
}
```

## Mock API

The component includes a mock API with simulated network delays:

- `searchAddresses(query: string)`: Returns filtered addresses
- `getContainerAddresses(containerId: string)`: Returns nested addresses for a container

## Mock Data

Includes realistic data representing:

- Standalone addresses (offices, parking lots, etc.)
- Warehouses with aisles and shelves
- Distribution centers with loading docks and storage areas
- Retail stores with floor sections

Replace the mock API with your actual API endpoints for production use.
