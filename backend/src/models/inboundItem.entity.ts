import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class InboundItemEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() inboundOrderId!: number;
  @Column() productId!: number;
  @Column() batchNo!: string;
  @Column('float') expectedQty!: number;
  @Column('float') actualQty!: number;
  @Column() qcResult!: string;
  @Column() binLocationId!: number;
}
