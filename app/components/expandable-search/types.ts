export interface SubAddress {
  id: string;
  name: string;
  code: string;
}

export interface Container {
  id: string;
  name: string;
  code: string;
  type: "container";
  subAddresses: SubAddress[];
}

export interface NormalAddress {
  id: string;
  name: string;
  code: string;
  type: "address";
}

export type AddressItem = Container | NormalAddress;

export interface ExpandableSearchProps {
  onSelect?: (item: AddressItem, subAddress?: SubAddress) => void;
}
