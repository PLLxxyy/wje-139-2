import { BinStatus, StorageRequirement } from './enums';
export type BinLocation = { id: number; area: 'A' | 'B' | 'C' | 'D'; rack: string; level: number; column: number; capacity: number; occupancy: number; storageRequirement: StorageRequirement; status: BinStatus };
