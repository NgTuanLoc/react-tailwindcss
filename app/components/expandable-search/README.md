# Expandable Search Component

A React component that provides a searchable, hierarchical view of containers and their sub-addresses with expand/collapse functionality.

## Features

- **Search Functionality**: Real-time search across containers and sub-addresses
- **Expandable Containers**: Click on containers to reveal their sub-addresses
- **Visual Feedback**: Clear indication of selected items
- **Dark Mode Support**: Full support for light and dark themes
- **Responsive Design**: Works on all screen sizes

## Usage

```tsx
import { ExpandableSearch } from './components/expandable-search';

function MyComponent() {
  const handleSelect = (container, subAddress) => {
    console.log('Selected:', container, subAddress);
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

## Data Structure

The component works with containers that have sub-addresses:

```typescript
interface Container {
  id: string;
  name: string;
  code: string;
  subAddresses: SubAddress[];
}

interface SubAddress {
  id: string;
  name: string;
  code: string;
}
```

## Mock Data

The component includes mock data representing:
- Warehouses with aisles and shelves
- Distribution centers with loading docks and storage areas
- Retail stores with floor sections

You can replace the mock data with your own data source by passing containers to the component.
