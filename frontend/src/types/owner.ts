import { OwnerStatus } from './enums';
export type Owner = { id: number; name: string; contact: string; phone: string; email: string; address: string; settlement: 'Monthly' | 'PerOrder' | 'Prepaid'; creditLimit: number; debt: number; status: OwnerStatus };
