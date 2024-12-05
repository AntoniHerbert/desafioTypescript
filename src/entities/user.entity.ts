// src/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Enterprise } from './enterprise.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => Enterprise, enterprise => enterprise.user)  // Relacionamento de One-to-Many com Enterprise
  enterprises: Enterprise[];
}
