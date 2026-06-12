import { Injectable } from '@nestjs/common';
@Injectable()
export class BinLocationService {
  private readonly rows = [{ id: 1, area: 'A', rack: 'R01', level: 2, column: 3, capacity: 40, occupancy: 76, storageRequirement: 'ColdChain', status: 'Occupied' }, { id: 2, area: 'B', rack: 'R08', level: 1, column: 6, capacity: 55, occupancy: 34, storageRequirement: 'Normal', status: 'Available' }];
  findAll() { return this.rows; }
  create(payload: any) { const row = { ...payload, id: this.rows.length + 1 }; this.rows.push(row); return row; }
}
