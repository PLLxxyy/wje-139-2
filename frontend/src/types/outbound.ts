import { OutboundStatus } from './enums';
export type OutboundItem = { id: number; productId: number; binLocationId: number; expectedQty: number; actualQty: number };
export type OutboundOrder = { id: number; orderNo: string; ownerId: number; receiver: string; address: string; requiredShipDate: string; shippedDate?: string; status: OutboundStatus; pickerId: number; checkerId: number; trackingNo?: string; items: OutboundItem[] };
