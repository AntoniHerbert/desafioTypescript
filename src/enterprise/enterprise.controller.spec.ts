import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { NotFoundException } from '@nestjs/common';
import { Enterprise } from './../entities/enterprise.entity';

describe('EnterpriseController', () => {
  let controller: EnterpriseController;
  let service: EnterpriseService;

  const mockEnterprise: Enterprise = {
    id: 1,
    name: 'Test Enterprise',
    cnpj: '12.345.678/0001-90',
    company: 'Umbrella Corporation',
    margin: 10,
    user: null, // Representa o usuário relacionado (ou pode ser um mock)
    contact: {
      id: 1,
      email: 'contact@umbrella.com',
      telephone: '1122334455',
      cell_phone: '11987654321',
    },
    address: {
      id: 1,
      cep: '12345-678',
      state: 'SP',
      city: 'São Paulo',
      district: 'Centro',
      street: 'Rua Teste',
    },
    createdAt: new Date(),
    updatedAt: null,
  };

  const mockEnterpriseArray: Enterprise[] = [mockEnterprise];

  const mockEnterpriseService = {
    create: jest.fn().mockResolvedValue(mockEnterprise),
    findAll: jest.fn().mockResolvedValue(mockEnterpriseArray),
    findOne: jest.fn((id: number) => {
      if (id === 1) return Promise.resolve(mockEnterprise);
      return Promise.reject(new NotFoundException());
    }),
    update: jest.fn().mockResolvedValue({ ...mockEnterprise, name: 'Updated Enterprise' }),
    remove: jest.fn().mockResolvedValue({ message: 'Enterprise removed successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterpriseController],
      providers: [EnterpriseService],
    })
      .overrideProvider(EnterpriseService)
      .useValue(mockEnterpriseService)
      .compile();

    controller = module.get<EnterpriseController>(EnterpriseController);
    service = module.get<EnterpriseService>(EnterpriseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an enterprise', async () => {
      const createDto: CreateEnterpriseDto = {
        name: 'Test Enterprise',
        cnpj: '12.345.678/0001-90',
        company: 'Umbrella Corporation',
        margin: 10,
        id_user: 1,
        address: {
          cep: '12345-678',
          state: 'SP',
          city: 'São Paulo',
          district: 'Centro',
          street: 'Rua Teste',
        },
        contact: {
          email: 'contact@umbrella.com',
          telephone: '1122334455',
          cell_phone: '11987654321',
        },
      };

      expect(await controller.create(createDto)).toEqual(mockEnterprise);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of enterprises', async () => {
      expect(await controller.findAll()).toEqual(mockEnterpriseArray);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single enterprise', async () => {
      expect(await controller.findOne('1')).toEqual(mockEnterprise);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if enterprise not found', async () => {
      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update an enterprise', async () => {
      const updateDto: UpdateEnterpriseDto = { name: 'Updated Enterprise' };

      expect(await controller.update('1', updateDto)).toEqual({
        ...mockEnterprise,
        name: 'Updated Enterprise',
      });
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove an enterprise', async () => {
      expect(await controller.remove('1')).toEqual({
        message: 'Enterprise removed successfully',
      });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
