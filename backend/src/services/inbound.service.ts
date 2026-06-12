import { Injectable } from '@nestjs/common';
@Injectable()
export class InboundService {
  private readonly rows = [{ id: 1, orderNo: 'INB-20260612-0001', ownerId: 1, supplier: '华东供应商', eta: '2026-06-12', ata: '2026-06-12', status: 'QCInProgress', qcInspectorId: 2, keeperId: 3, remark: '优先质检', items: [{ id: 1, productId: 1, batchNo: 'B202606', expectedQty: 120, actualQty: 118, qcResult: 'Partial', binLocationId: 1 }] }];
  findAll() { return this.rows; }
  create(payload: any) { const row = { ...payload, id: this.rows.length + 1 }; this.rows.push(row); return row; }
}
