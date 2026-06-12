export type Role = 'Admin' | 'WarehouseManager' | 'QCInspector' | 'Picker' | 'Checker' | 'Owner';
export interface ApiResponse<T> { data: T; message: string; }
