export type AddressType = 'container' | 'address';

export interface Address {
  id: string;
  name: string;
  code: string;
  type: AddressType;
}

export interface ExpandableSearchProps {
  /** Callback when an address is selected */
  onSelect?: (address: Address) => void;
  
  /** Callback when a container is expanded */
  onContainerExpand?: (containerId: string) => void;
  
  /** Callback when a container is collapsed */
  onContainerCollapse?: (containerId: string) => void;
  
  /** Custom search function - receives query string, returns Promise<Address[]> */
  searchFunction?: (query: string) => Promise<Address[]>;
  
  /** Custom function to get container addresses - receives containerId, returns Promise<Address[]> */
  getContainerAddressesFunction?: (containerId: string) => Promise<Address[]>;
  
  /** Custom function to get container address count - receives containerId, returns number */
  getContainerCountFunction?: (containerId: string) => number;
  
  /** Placeholder text for search input */
  placeholder?: string;
  
  /** Height of the results scroll area (default: '400px') */
  scrollHeight?: string;
  
  /** Initial search term */
  initialSearchTerm?: string;
  
  /** Custom empty state message */
  emptyStateMessage?: string;
  
  /** Show container count badge */
  showContainerCount?: boolean;
  
  /** Custom CSS class for the container */
  className?: string;
}
