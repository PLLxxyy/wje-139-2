import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class OwnerEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() name!: string;
  @Column() contact!: string;
  @Column() phone!: string;
  @Column() email!: string;
  @Column() address!: string;
  @Column() settlement!: string;
  @Column('float') creditLimit!: number;
  @Column('float') debt!: number;
  @Column() status!: string;
}
