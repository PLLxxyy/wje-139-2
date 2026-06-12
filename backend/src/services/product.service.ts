import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductService {
  private readonly rows = [{ id: 1, ownerId: 1, name: '冷链食品 A', sku: 'SKU-CC-01', barcode: '6900001', category: '食品', spec: '10kg/箱', unit: '箱', shelfLifeDays: 180, storageRequirement: 'ColdChain', volume: 0.08, weight: 10 }];
  findAll() { return this.rows; }
  create(payload: any) { const row = { ...payload, id: this.rows.length + 1 }; this.rows.push(row); return row; }
}
