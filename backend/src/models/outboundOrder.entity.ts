import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class OutboundOrderEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() orderNo!: string;
  @Column() ownerId!: number;
  @Column() receiver!: string;
  @Column() address!: string;
  @Column() requiredShipDate!: string;
  @Column({ nullable: true }) shippedDate?: string;
  @Column() status!: string;
  @Column() pickerId!: number;
  @Column() checkerId!: number;
  @Column({ nullable: true }) trackingNo?: string;
}
