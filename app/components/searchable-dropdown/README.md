# Searchable Dropdown Component

A reusable React component that provides search functionality with API integration and debouncing.

## Features

- 🔍 **Search Ability** - Real-time search input with debouncing
- 📡 **API Integration** - Fetches data based on search query
- ⏱️ **Debounce** - Custom hook to reduce API calls
- ♿ **Accessible** - Keyboard navigation and focus management
- 🎨 **Styled** - Tailwind CSS with hover and focus states
- 📦 **TypeScript** - Full type safety
- ⚠️ **No Warnings** - Clean, production-ready code

## Components

### SearchableDropdown
Main component that renders the dropdown with search.

```tsx
import { SearchableDropdown } from '@/app/components/searchable-dropdown';

<SearchableDropdown
  placeholder="Search products..."
  onSearch={async (query) => {
    const response = await fetch(`/api/products?q=${query}`);
    return response.json();
  }}
  onSelect={(item) => console.log('Selected:', item)}
  debounceTime={500}
/>
```

**Props:**
- `placeholder` (string, optional) - Input placeholder text
- `onSearch` (function, required) - Async function that returns filtered items
- `onSelect` (function, required) - Called when user selects an item
- `debounceTime` (number, optional) - Debounce delay in ms (default: 500)
- `className` (string, optional) - Additional CSS classes
- `isLoading` (boolean, optional) - External loading state
- `error` (string | null, optional) - Error message to display

### useDebounce
Custom hook for debouncing values.

```tsx
import { useDebounce } from '@/app/components/searchable-dropdown';

const debouncedValue = useDebounce(value, 500);
```

## Example Usage

See `SearchableDropdownShowcase.tsx` for a complete example with mock API.

## How It Works

1. User types in the input field
2. Input value is debounced (default 500ms)
3. Debounced query triggers `onSearch` function
4. Results are displayed in dropdown
5. User clicks item to select it
6. `onSelect` callback is called with selected item
