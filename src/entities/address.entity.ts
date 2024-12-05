import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  cep: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 255 })
  street: string;
}
