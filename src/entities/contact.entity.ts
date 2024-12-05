import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 20 })
  telephone: string;

  @Column({ length: 20 })
  cell_phone: string;
}
