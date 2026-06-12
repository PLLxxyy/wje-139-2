import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BinLocationEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() area!: string;
  @Column() rack!: string;
  @Column() level!: number;
  @Column() column!: number;
  @Column('float') capacity!: number;
  @Column('float') occupancy!: number;
  @Column() storageRequirement!: string;
  @Column() status!: string;
}
