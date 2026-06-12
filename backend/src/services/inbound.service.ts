import { Injectable } from '@nestjs/common';
import { ProductService } from './product.service';

@Injectable()
export class InboundService {
  private readonly rows: any[] = [
    {
      id: 1,
      orderNo: 'INB-20260612-0001',
      ownerId: 1,
      supplier: '华东供应商',
      eta: '2026-06-12',
      ata: '2026-06-12',
      status: 'QCInProgress',
      qcInspectorId: 2,
      keeperId: 3,
      remark: '优先质检',
      items: [
        {
          id: 1,
          productId: 1,
          batchNo: 'B202606',
          productionDate: '2026-05-01',
          expiryDate: '2026-10-28',
          expectedQty: 120,
          actualQty: 118,
          qcResult: 'Partial',
          binLocationId: 1
        }
      ]
    },
    {
      id: 2,
      orderNo: 'INB-20260510-0002',
      ownerId: 1,
      supplier: '华南供应商',
      eta: '2026-05-10',
      ata: '2026-05-10',
      status: 'Completed',
      qcInspectorId: 2,
      keeperId: 3,
      remark: '',
      items: [
        {
          id: 2,
        productId: 1,
          batchNo: 'B202605',
          productionDate: '2026-01-05',
          expiryDate: '2026-07-04',
          expectedQty: 200,
          actualQty: 50,
          qcResult: 'Pass',
          binLocationId: 2
        },
        {
          id: 3,
          productId: 1,
          batchNo: 'B202604',
          productionDate: '2025-12-20',
          expiryDate: '2026-06-18',
          expectedQty: 100,
          actualQty: 20,
          qcResult: 'Pass',
          binLocationId: 3
        }
      ]
    }
  ];

  constructor(private readonly productService: ProductService) {}

  calculateExpiryDate(productionDate: string, shelfLifeDays: number): string {
    if (!productionDate || !shelfLifeDays) return '';
    const date = new Date(productionDate);
    date.setDate(date.getDate() + shelfLifeDays);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  findAll() { return this.rows; }

  create(payload: any) {
    const items = (payload.items || []).map((item: any, idx: number) => {
      const product = this.productService.findById(item.productId);
      const shelfLifeDays = product?.shelfLifeDays;
      const expiryDate = item.productionDate && shelfLifeDays
        ? this.calculateExpiryDate(item.productionDate, shelfLifeDays)
        : item.expiryDate;
      return { ...item, id: idx + 1, expiryDate };
    });
    const row = { ...payload, id: this.rows.length + 1, items };
    this.rows.push(row);
    return row;
  }

  getExpiringItems(daysWithin: number = 30): any[] {
    const now = new Date();
    const threshold = new Date();
    threshold.setDate(now.getDate() + daysWithin);
    const results: any[] = [];

    for (const order of this.rows) {
      for (const item of order.items || []) {
        const product = this.productService.findById(item.productId);
        const shelfLifeDays = product?.shelfLifeDays;
        if (!item.productionDate || !shelfLifeDays || item.actualQty <= 0) continue;
        const expiryStr = this.calculateExpiryDate(item.productionDate, shelfLifeDays);
        const expiry = new Date(expiryStr);
        if (expiry >= now && expiry <= threshold) {
          results.push({
            ...item,
            expiryDate: expiryStr,
            orderNo: order.orderNo,
            productName: product?.name || '',
            productSku: product?.sku || '',
            daysLeft: Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          });
        }
      }
    }
    return results.sort((a, b) => a.daysLeft - b.daysLeft);
  }
}
