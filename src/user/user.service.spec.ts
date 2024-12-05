import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  const mockUser = {
    id: 1,
    name: 'Shaulim Matador de Porco',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const updatedUser = {
    ...mockUser,
    name: 'Updated Name', // Nome atualizado
    updatedAt: new Date(), // Garantir que o updatedAt seja atualizado
  };

  const createDto: CreateUserDto = { name: 'Shaulim Matador de Porco' };
  const updateDto: UpdateUserDto = { name: 'Updated Name' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(mockUser), // Mock do create
            save: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue([1]), // Simula uma atualização bem-sucedida
            delete: jest.fn().mockResolvedValue({ affected: 1 }), // Simula exclusão bem-sucedida
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = await service.create(createDto);

      expect(result).toEqual(mockUser);
      expect(repo.create).toHaveBeenCalledWith(createDto); // Verifica a chamada correta ao create
      expect(repo.save).toHaveBeenCalledWith(mockUser); // Verifica a chamada ao save com o mockUser
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Mock da resposta de update para retornar o usuário atualizado
      repo.update = jest.fn().mockResolvedValue([1]);

      // Chama o método update
      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedUser); // Verifica se o usuário retornado tem o nome atualizado
      expect(repo.update).toHaveBeenCalledWith(1, updateDto); // Verifica se o update foi chamado corretamente
    });

    it('should throw an error if user not found', async () => {
      repo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.update(1, updateDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      repo.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if user not found', async () => {
      repo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findOne(1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      repo.delete = jest.fn().mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(result).toEqual({ affected: 1 }); // Ajustado para refletir o retorno esperado
      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user not found', async () => {
      repo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.remove(1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
