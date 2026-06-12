import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class InboundOrderEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() orderNo!: string;
  @Column() ownerId!: number;
  @Column() supplier!: string;
  @Column() eta!: string;
  @Column({ nullable: true }) ata?: string;
  @Column() status!: string;
  @Column() qcInspectorId!: number;
  @Column() keeperId!: number;
  @Column({ nullable: true }) remark?: string;
}
