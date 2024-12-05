// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(true),
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'John Doe' }]),
    findOne: jest.fn(),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      const userDto = { name: 'John Doe' };
      const result = await service.create(userDto);
      expect(result).toBe(true);
      expect(mockUserRepository.save).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1, name: 'John Doe' }]);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'John Doe', enterprises: [] };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      try {
        await service.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toBe('User not found');
      }
    });
  });

  describe('update', () => {
    it('should update and return the updated user', async () => {
      // Usuário inicial
      const user = { id: 1, name: 'John Doe', enterprises: [] };
      // Dados de atualização
      const updateDto = { name: 'Updated Name' };
  
      // Mock para simular o retorno do findOne, antes da atualização
      mockUserRepository.findOne.mockResolvedValue(user);
      
      // Simulando que o update não retorna nada, mas a atualização foi feita
      mockUserRepository.update.mockResolvedValue({ affected: 1 });
  
      // Após a atualização, esperamos que o findOne retorne o usuário atualizado
      mockUserRepository.findOne.mockResolvedValue({ ...user, ...updateDto });
  
      // Chamando o método update
      const result = await service.update(1, updateDto);
  
      // Verificando se o usuário foi retornado com as informações atualizadas
      expect(result).toEqual({ id: 1, name: 'Updated Name', enterprises: [] });
      expect(mockUserRepository.update).toHaveBeenCalledWith(1, updateDto);
    });
  });
  

  describe('remove', () => {
    it('should delete a user', async () => {
      const user = { id: 1, name: 'John Doe' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.remove(1);
      expect(result).toBe(true);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user to delete is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      try {
        await service.remove(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toBe('User not found');
      }
    });
  });
});
