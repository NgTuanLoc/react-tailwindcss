export interface DropdownItem {
  id: string | number;
  label: string;
  [key: string]: unknown;
}

export interface SearchableDropdownProps {
  placeholder?: string;
  onSearch: (query: string) => Promise<DropdownItem[]>;
  onSelect: (item: DropdownItem) => void;
  debounceTime?: number;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}
