import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class OutboundItemEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() outboundOrderId!: number;
  @Column() productId!: number;
  @Column() binLocationId!: number;
  @Column('float') expectedQty!: number;
  @Column('float') actualQty!: number;
}
