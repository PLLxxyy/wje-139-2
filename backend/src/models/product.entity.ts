import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() ownerId!: number;
  @Column() name!: string;
  @Column() sku!: string;
  @Column() barcode!: string;
  @Column() category!: string;
  @Column() spec!: string;
  @Column() unit!: string;
  @Column({ nullable: true }) shelfLifeDays?: number;
  @Column() storageRequirement!: string;
  @Column('float') volume!: number;
  @Column('float') weight!: number;
}
