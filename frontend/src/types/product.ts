import { StorageRequirement } from './enums';
export type Product = { id: number; ownerId: number; name: string; sku: string; barcode: string; category: string; spec: string; unit: string; shelfLifeDays?: number; storageRequirement: StorageRequirement; volume: number; weight: number };
