import { Address, AddressType } from './types';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock database of all addresses
const allAddresses: Address[] = [
  // Standalone addresses (not containers)
  {
    id: 'addr-1',
    name: 'Main Office Reception',
    code: 'MO-REC-001',
    type: 'address' as AddressType,
  },
  {
    id: 'addr-2',
    name: 'Executive Suite - Floor 10',
    code: 'EXEC-F10',
    type: 'address' as AddressType,
  },
  {
    id: 'addr-3',
    name: 'IT Department - Building C',
    code: 'IT-BLDG-C',
    type: 'address' as AddressType,
  },
  {
    id: 'addr-4',
    name: 'Customer Service Center',
    code: 'CSC-001',
    type: 'address' as AddressType,
  },
  {
    id: 'addr-5',
    name: 'Parking Lot A - Level 2',
    code: 'PKG-A-L2',
    type: 'address' as AddressType,
  },
  
  // Containers
  {
    id: 'cont-1',
    name: 'Warehouse A - North Wing',
    code: 'WH-A-N',
    type: 'container' as AddressType,
  },
  {
    id: 'cont-2',
    name: 'Warehouse A - South Wing',
    code: 'WH-A-S',
    type: 'container' as AddressType,
  },
  {
    id: 'cont-3',
    name: 'Distribution Center - East',
    code: 'DC-E',
    type: 'container' as AddressType,
  },
  {
    id: 'cont-4',
    name: 'Warehouse B - Main Storage',
    code: 'WH-B-M',
    type: 'container' as AddressType,
  },
  {
    id: 'cont-5',
    name: 'Retail Store - Downtown',
    code: 'RS-DT',
    type: 'container' as AddressType,
  },
];

// Mock nested addresses for each container
const containerAddresses: Record<string, Address[]> = {
  'cont-1': [
    { id: 'cont-1-1', name: 'Aisle 1 - Shelf A', code: 'WH-A-N-1A', type: 'address' as AddressType },
    { id: 'cont-1-2', name: 'Aisle 1 - Shelf B', code: 'WH-A-N-1B', type: 'address' as AddressType },
    { id: 'cont-1-3', name: 'Aisle 2 - Shelf A', code: 'WH-A-N-2A', type: 'address' as AddressType },
    { id: 'cont-1-4', name: 'Aisle 2 - Shelf B', code: 'WH-A-N-2B', type: 'address' as AddressType },
    { id: 'cont-1-5', name: 'Aisle 3 - Shelf A', code: 'WH-A-N-3A', type: 'address' as AddressType },
    { id: 'cont-1-6', name: 'Aisle 3 - Shelf B', code: 'WH-A-N-3B', type: 'address' as AddressType },
  ],
  'cont-2': [
    { id: 'cont-2-1', name: 'Aisle 1 - Shelf A', code: 'WH-A-S-1A', type: 'address' as AddressType },
    { id: 'cont-2-2', name: 'Aisle 1 - Shelf B', code: 'WH-A-S-1B', type: 'address' as AddressType },
    { id: 'cont-2-3', name: 'Aisle 2 - Shelf A', code: 'WH-A-S-2A', type: 'address' as AddressType },
    { id: 'cont-2-4', name: 'Aisle 2 - Shelf B', code: 'WH-A-S-2B', type: 'address' as AddressType },
  ],
  'cont-3': [
    { id: 'cont-3-1', name: 'Loading Dock 1', code: 'DC-E-LD1', type: 'address' as AddressType },
    { id: 'cont-3-2', name: 'Loading Dock 2', code: 'DC-E-LD2', type: 'address' as AddressType },
    { id: 'cont-3-3', name: 'Storage Area A', code: 'DC-E-SAA', type: 'address' as AddressType },
    { id: 'cont-3-4', name: 'Storage Area B', code: 'DC-E-SAB', type: 'address' as AddressType },
    { id: 'cont-3-5', name: 'Refrigerated Zone', code: 'DC-E-RZ', type: 'address' as AddressType },
  ],
  'cont-4': [
    { id: 'cont-4-1', name: 'Zone 1 - Bay 1', code: 'WH-B-M-Z1B1', type: 'address' as AddressType },
    { id: 'cont-4-2', name: 'Zone 1 - Bay 2', code: 'WH-B-M-Z1B2', type: 'address' as AddressType },
    { id: 'cont-4-3', name: 'Zone 2 - Bay 1', code: 'WH-B-M-Z2B1', type: 'address' as AddressType },
    { id: 'cont-4-4', name: 'Zone 2 - Bay 2', code: 'WH-B-M-Z2B2', type: 'address' as AddressType },
    { id: 'cont-4-5', name: 'Zone 3 - Bay 1', code: 'WH-B-M-Z3B1', type: 'address' as AddressType },
    { id: 'cont-4-6', name: 'Zone 3 - Bay 2', code: 'WH-B-M-Z3B2', type: 'address' as AddressType },
  ],
  'cont-5': [
    { id: 'cont-5-1', name: 'Floor 1 - Section A', code: 'RS-DT-F1SA', type: 'address' as AddressType },
    { id: 'cont-5-2', name: 'Floor 1 - Section B', code: 'RS-DT-F1SB', type: 'address' as AddressType },
    { id: 'cont-5-3', name: 'Floor 2 - Section A', code: 'RS-DT-F2SA', type: 'address' as AddressType },
    { id: 'cont-5-4', name: 'Floor 2 - Section B', code: 'RS-DT-F2SB', type: 'address' as AddressType },
    { id: 'cont-5-5', name: 'Basement Storage', code: 'RS-DT-BS', type: 'address' as AddressType },
  ],
};

/**
 * Mock API: Search addresses by query string
 * @param query - Search term to filter addresses
 * @returns Promise with filtered addresses
 */
export async function searchAddresses(query: string): Promise<Address[]> {
  await delay(300); // Simulate network latency
  
  if (!query.trim()) {
    return allAddresses;
  }
  
  const lowerQuery = query.toLowerCase();
  return allAddresses.filter(
    (address) =>
      address.name.toLowerCase().includes(lowerQuery) ||
      address.code.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Mock API: Get nested addresses for a container
 * @param containerId - ID of the container to fetch addresses for
 * @returns Promise with nested addresses or empty array
 */
export async function getContainerAddresses(containerId: string): Promise<Address[]> {
  await delay(400); // Simulate network latency
  
  const addresses = containerAddresses[containerId] || [];
  return addresses;
}

/**
 * Mock API: Get address count for a container
 * @param containerId - ID of the container
 * @returns Number of addresses in the container
 */
export function getContainerAddressCount(containerId: string): number {
  return containerAddresses[containerId]?.length || 0;
}
