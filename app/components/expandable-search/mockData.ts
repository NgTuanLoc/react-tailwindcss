import { AddressItem } from "./types";

export const mockAddresses: AddressItem[] = [
  {
    id: "1",
    name: "Warehouse A - North Wing",
    code: "WH-A-N",
    type: "container",
    subAddresses: [
      { id: "1-1", name: "Aisle 1 - Shelf A", code: "WH-A-N-1A" },
      { id: "1-2", name: "Aisle 1 - Shelf B", code: "WH-A-N-1B" },
      { id: "1-3", name: "Aisle 2 - Shelf A", code: "WH-A-N-2A" },
      { id: "1-4", name: "Aisle 2 - Shelf B", code: "WH-A-N-2B" },
      { id: "1-5", name: "Aisle 3 - Shelf A", code: "WH-A-N-3A" },
    ],
  },
  {
    id: "2",
    name: "Warehouse A - South Wing",
    code: "WH-A-S",
    type: "container",
    subAddresses: [
      { id: "2-1", name: "Aisle 1 - Shelf A", code: "WH-A-S-1A" },
      { id: "2-2", name: "Aisle 1 - Shelf B", code: "WH-A-S-1B" },
      { id: "2-3", name: "Aisle 2 - Shelf A", code: "WH-A-S-2A" },
    ],
  },
  {
    id: "7",
    name: "Customer Pickup Point",
    code: "CPP-001",
    type: "address",
  },
  {
    id: "3",
    name: "Warehouse B - Main Storage",
    code: "WH-B-M",
    type: "container",
    subAddresses: [
      { id: "3-1", name: "Zone 1 - Bay 1", code: "WH-B-M-Z1B1" },
      { id: "3-2", name: "Zone 1 - Bay 2", code: "WH-B-M-Z1B2" },
      { id: "3-3", name: "Zone 2 - Bay 1", code: "WH-B-M-Z2B1" },
      { id: "3-4", name: "Zone 2 - Bay 2", code: "WH-B-M-Z2B2" },
      { id: "3-5", name: "Zone 3 - Bay 1", code: "WH-B-M-Z3B1" },
      { id: "3-6", name: "Zone 3 - Bay 2", code: "WH-B-M-Z3B2" },
    ],
  },
  {
    id: "8",
    name: "Main Office Reception",
    code: "OFF-REC",
    type: "address",
  },
  {
    id: "4",
    name: "Distribution Center - East",
    code: "DC-E",
    type: "container",
    subAddresses: [
      { id: "4-1", name: "Loading Dock 1", code: "DC-E-LD1" },
      { id: "4-2", name: "Loading Dock 2", code: "DC-E-LD2" },
      { id: "4-3", name: "Storage Area A", code: "DC-E-SAA" },
      { id: "4-4", name: "Storage Area B", code: "DC-E-SAB" },
    ],
  },
  {
    id: "9",
    name: "Parking Lot A - Security Gate",
    code: "PL-A-SG",
    type: "address",
  },
  {
    id: "5",
    name: "Distribution Center - West",
    code: "DC-W",
    type: "container",
    subAddresses: [
      { id: "5-1", name: "Loading Dock 1", code: "DC-W-LD1" },
      { id: "5-2", name: "Cold Storage 1", code: "DC-W-CS1" },
      { id: "5-3", name: "Cold Storage 2", code: "DC-W-CS2" },
      { id: "5-4", name: "Dry Storage 1", code: "DC-W-DS1" },
      { id: "5-5", name: "Dry Storage 2", code: "DC-W-DS2" },
    ],
  },
  {
    id: "10",
    name: "Maintenance Workshop",
    code: "MAINT-WS",
    type: "address",
  },
  {
    id: "6",
    name: "Retail Store - Downtown",
    code: "RS-DT",
    type: "container",
    subAddresses: [
      { id: "6-1", name: "Floor 1 - Section A", code: "RS-DT-F1SA" },
      { id: "6-2", name: "Floor 1 - Section B", code: "RS-DT-F1SB" },
      { id: "6-3", name: "Floor 2 - Section A", code: "RS-DT-F2SA" },
      { id: "6-4", name: "Basement Storage", code: "RS-DT-BS" },
    ],
  },
  {
    id: "11",
    name: "Emergency Assembly Point",
    code: "EAP-001",
    type: "address",
  },
];
