import { InboundStatus, QCResult } from './enums';

export type InboundItem = {
  id: number;
  productId: number;
  batchNo: string;
  productionDate?: string;
  expiryDate?: string;
  expectedQty: number;
  actualQty: number;
  qcResult: QCResult;
  binLocationId: number;
};

export type ExpiringItem = {
  id: number;
  productId: number;
  batchNo: string;
  productionDate?: string;
  expiryDate?: string;
  actualQty: number;
  binLocationId: number;
  orderNo: string;
  productName: string;
  productSku: string;
  daysLeft: number;
};

export type InboundOrder = {
  id: number;
  orderNo: string;
  ownerId: number;
  supplier: string;
  eta: string;
  ata?: string;
  status: InboundStatus;
  qcInspectorId: number;
  keeperId: number;
  remark?: string;
  items: InboundItem[];
};
