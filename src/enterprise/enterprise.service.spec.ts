// src/enterprise/enterprise.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from 'src/entities/enterprise.entity';
import { Contact } from 'src/entities/contact.entity';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { NotFoundException } from '@nestjs/common';

describe('EnterpriseService', () => {
  let service: EnterpriseService;
  let enterpriseRepository: Repository<Enterprise>;
  let userRepository: Repository<User>;
  let contactRepository: Repository<Contact>;
  let addressRepository: Repository<Address>;

  const mockEnterpriseRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockContactRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAddressRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnterpriseService,
        { provide: getRepositoryToken(Enterprise), useValue: mockEnterpriseRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(Contact), useValue: mockContactRepository },
        { provide: getRepositoryToken(Address), useValue: mockAddressRepository },
      ],
    }).compile();

    service = module.get<EnterpriseService>(EnterpriseService);
    enterpriseRepository = module.get<Repository<Enterprise>>(getRepositoryToken(Enterprise));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    contactRepository = module.get<Repository<Contact>>(getRepositoryToken(Contact));
    addressRepository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new enterprise with associated contact and address', async () => {
      const mockUser = { id: 1, name: 'Test User', updatedAt: new Date(), enterprises: [] };
      const mockContact = { id: 1, 
        email: 'contact@test.com', 
        telephone: '123456789',  // Adicionando o campo 'telephone'
        cell_phone: '987654321'  };
      const mockAddress = { id: 1, 
        city: 'Test City',
        cep: '12345',      // Adicionando o campo 'cep'
        state: 'Test State',  // Adicionando o campo 'state'
        district: 'Test District',  // Adicionando o campo 'district'
        street: 'Test Street' };
      const mockEnterprise = {
        id: 1,
        name: 'Test Enterprise',
        cnpj: '12345678901234',
        company: 'Test Company',
        margin: 10,
        user: mockUser,
        contact: mockContact,
        address: mockAddress,
        createdAt: new Date(),
        updatedAt: null,
      };

      const createDto: CreateEnterpriseDto = {
        name: 'Test Enterprise',
        cnpj: '12345678901234',
        company: 'Test Company',
        margin: 10,
        id_user: 1,
        contact: { email: 'contact@test.com', telephone: '1234', cell_phone: '5678' },
        address: { cep: '12345', state: 'Test State', city: 'Test City', district: 'Test District', street: 'Test Street' },
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(contactRepository, 'create').mockReturnValue(mockContact as Contact);
      jest.spyOn(contactRepository, 'save').mockResolvedValue(mockContact as Contact);
      jest.spyOn(addressRepository, 'create').mockReturnValue(mockAddress as Address);
      jest.spyOn(addressRepository, 'save').mockResolvedValue(mockAddress as Address);
      jest.spyOn(enterpriseRepository, 'create').mockReturnValue(mockEnterprise as Enterprise);
      jest.spyOn(enterpriseRepository, 'save').mockResolvedValue(mockEnterprise as Enterprise);

      const result = await service.create(createDto);

      expect(result).toEqual(mockEnterprise);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(contactRepository.create).toHaveBeenCalledWith(createDto.contact);
      expect(contactRepository.save).toHaveBeenCalledWith(mockContact);
      expect(addressRepository.create).toHaveBeenCalledWith(createDto.address);
      expect(addressRepository.save).toHaveBeenCalledWith(mockAddress);
      expect(enterpriseRepository.save).toHaveBeenCalledWith(mockEnterprise);
    });
  });

  describe('update', () => {
    it('should update an enterprise with new contact and address', async () => {
      const existingEnterprise = {
        id: 1,
        name: 'Old Enterprise',
        cnpj: '12345678901234',
        company: 'Old Company',
        margin: 10,
        user: { id: 1, name: 'Test User', updatedAt: new Date(), enterprises: [] },
        contact: { id: 1, email: 'oldemail@test.com', telephone: '1234', cell_phone: '5678' },
        address: { id: 1, city: 'Old City', cep: '12345', state: 'Test State', district: 'Test District', street: 'Test Street' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const updatedEnterpriseDto: UpdateEnterpriseDto = {
        name: 'Updated Enterprise',
        cnpj: '98765432109876',
        margin: 15,
        contact: {  id: 1, // Incluindo o id
          email: 'updated@test.com', 
          telephone: '4321', 
          cell_phone: '8765' },
        address: {         id: 1, // Incluindo o id do endereço
          city: 'Updated City',
          cep: '98765',
          state: 'Test State Updated',
          district: 'Test District Updated',
          street: 'Test Street Updated',},
      };
  
      const updatedEnterprise = {
        ...existingEnterprise,
        ...updatedEnterpriseDto,
        updatedAt: new Date(),
      };
  
      jest.spyOn(enterpriseRepository, 'findOne').mockResolvedValue(existingEnterprise as Enterprise);
      jest.spyOn(contactRepository, 'update').mockResolvedValue(undefined);  // Simula a atualização do contato
      jest.spyOn(addressRepository, 'update').mockResolvedValue(undefined); // Simula a atualização do endereço
      jest.spyOn(enterpriseRepository, 'save').mockResolvedValue(updatedEnterprise as Enterprise);
  
      const result = await service.update(1, updatedEnterpriseDto);
  
      expect(result).toEqual(updatedEnterprise);
      expect(enterpriseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['contact', 'address', 'user'], // Relações incluídas corretamente
      });
      expect(contactRepository.update).toHaveBeenCalledWith(1, updatedEnterpriseDto.contact);  // Passa o id do contato corretamente
      expect(addressRepository.update).toHaveBeenCalledWith(existingEnterprise.address.id, updatedEnterpriseDto.address);
      expect(enterpriseRepository.save).toHaveBeenCalledWith(updatedEnterprise);
    });
  });
  

  describe('remove', () => {
    it('should remove an enterprise with associated contact and address', async () => {
      const enterpriseToRemove = { id: 1, contact: { id: 1 }, address: { id: 1 } };

      jest.spyOn(enterpriseRepository, 'findOne').mockResolvedValue(enterpriseToRemove as Enterprise);
      jest.spyOn(contactRepository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(addressRepository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(enterpriseRepository, 'delete').mockResolvedValue(undefined);

      await service.remove(1);

      expect(contactRepository.delete).toHaveBeenCalledWith(enterpriseToRemove.contact.id);
      expect(addressRepository.delete).toHaveBeenCalledWith(enterpriseToRemove.address.id);
      expect(enterpriseRepository.delete).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if enterprise not found during removal', async () => {
      jest.spyOn(enterpriseRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
