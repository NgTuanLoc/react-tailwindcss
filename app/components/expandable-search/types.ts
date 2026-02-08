export type AddressType = 'container' | 'address';

export interface Address {
  id: string;
  name: string;
  code: string;
  type: AddressType;
}

export interface ExpandableSearchProps {
  onSelect?: (address: Address) => void;
}
