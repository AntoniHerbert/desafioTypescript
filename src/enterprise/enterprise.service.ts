// src/enterprise/enterprise.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from 'src/entities/enterprise.entity';
import { Contact } from 'src/entities/contact.entity';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateEnterpriseDto): Promise<Enterprise> {
    const user = await this.userRepository.findOne({ where: { id: data.id_user } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Criar e salvar contato
    const contact = this.contactRepository.create(data.contact);
    const savedContact = await this.contactRepository.save(contact);

    // Criar e salvar endereço
    const address = this.addressRepository.create(data.address);
    const savedAddress = await this.addressRepository.save(address);

    // Criar e salvar empresa
    const enterprise = this.enterpriseRepository.create({
      ...data,
      contact: savedContact,
      address: savedAddress,
      user,
      createdAt: new Date(),
      updatedAt: null,
    });

    return await this.enterpriseRepository.save(enterprise);
  }

  async findAll(): Promise<Enterprise[]> {
    return await this.enterpriseRepository.find({
      relations: ['contact', 'address', 'user'],
    });
  }

  async findOne(id: number): Promise<Enterprise> {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { id },
      relations: ['contact', 'address', 'user'],
    });

    if (!enterprise) {
      throw new NotFoundException('Enterprise not found');
    }

    return enterprise;
  }

  async update(id: number, data: UpdateEnterpriseDto): Promise<Enterprise> {
    // Encontrar a empresa com suas relações
    const enterprise = await this.enterpriseRepository.findOne({
      where: { id },
      relations: ['contact', 'address', 'user'],
    });
  
    if (!enterprise) {
      throw new NotFoundException('Enterprise not found');
    }
  
    // Atualizar o contato
    if (data.contact) {
      await this.contactRepository.update(enterprise.contact.id, data.contact);
    }
  
    // Atualizar o endereço
    if (data.address) {
      await this.addressRepository.update(enterprise.address.id, data.address);
    }
  
    // Atualizar o usuário
    if (data.id_user) {
      const user = await this.userRepository.findOne({ where: { id: data.id_user } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      enterprise.user = user; // Atualiza a relação
    }
  
    // Atualizar demais campos da empresa
    Object.assign(enterprise, {
      ...data,
      updatedAt: new Date(),
    });
  
    // Salvar alterações
    await this.enterpriseRepository.save(enterprise);
  
    return this.findOne(id);
  }
  
  

  async remove(id: number) {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { id },
      relations: ['contact', 'address'], // Garanta que contact e address sejam carregados
    });
  
    if (!enterprise) {
      throw new NotFoundException('Enterprise not found');
    }
  
    // Verifique se o contato e o endereço existem antes de tentar deletá-los
    if (enterprise.contact) {
      await this.contactRepository.delete(enterprise.contact.id);
    } else {
      console.warn('Contact not found, skipping contact deletion');
    }
  
    if (enterprise.address) {
      await this.addressRepository.delete(enterprise.address.id);
    } else {
      console.warn('Address not found, skipping address deletion');
    }
  
    // Remover a empresa
    return await this.enterpriseRepository.delete({ id });
  }
  
  
}
