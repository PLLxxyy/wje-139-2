import { Injectable } from '@nestjs/common';
@Injectable()
export class OwnerService {
  private readonly rows = [{ id: 1, name: '海城贸易', contact: '王经理', phone: '13800000001', email: 'owner@example.com', address: '上海浦东', settlement: 'Monthly', creditLimit: 500000, debt: 82000, status: 'Active' }];
  findAll() { return this.rows; }
  create(payload: any) { const row = { ...payload, id: this.rows.length + 1 }; this.rows.push(row); return row; }
}
