// src/entities/enterprise.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Contact } from './contact.entity';
import { Address } from './address.entity';

@Entity('enterprise')
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20, unique: true })
  cnpj: string;

  @Column({ length: 255 })
  company: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'numeric' })
  margin: number;

  @ManyToOne(() => User, user => user.enterprises, {onDelete: 'SET NULL'})  // Relacionamento de Many-to-One com User
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Contact, { nullable: true , onDelete:'CASCADE'})
  @JoinColumn({ name: 'contact' })
  contact: Contact;

  @ManyToOne(() => Address, { nullable: true , onDelete:'CASCADE'})
  @JoinColumn({ name: 'address' })
  address: Address;
}
