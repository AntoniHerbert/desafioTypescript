import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = { id: 1, name: 'Shaulim Matador de Porco' };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockImplementation((id: number) => {
      if (id === 1) return Promise.resolve(mockUser);
      return Promise.reject(new Error('User not found'));
    }),
    update: jest.fn().mockImplementation((id: number, dto: UpdateUserDto) => {
      if (id === 1) return Promise.resolve({ ...mockUser, ...dto });
      return Promise.reject(new Error('User not found'));
    }),
    remove: jest.fn().mockImplementation((id: number) => {
      if (id === 1) return Promise.resolve({ message: 'User removed successfully' });
      return Promise.reject(new Error('User not found'));
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createDto: CreateUserDto = { name: 'Shaulim Matador de Porco' };

      const result = await controller.create(createDto);
      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user is not found', async () => {
      await expect(controller.findOne('999')).rejects.toThrow('User not found');
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateDto: UpdateUserDto = { name: 'Updated Name' };

      const result = await controller.update('1', updateDto);
      expect(result).toEqual({ ...mockUser, ...updateDto });
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw an error if user is not found', async () => {
      const updateDto: UpdateUserDto = { name: 'Updated Name' };

      await expect(controller.update('999', updateDto)).rejects.toThrow('User not found');
      expect(service.update).toHaveBeenCalledWith(999, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'User removed successfully' });
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user is not found', async () => {
      await expect(controller.remove('999')).rejects.toThrow('User not found');
      expect(service.remove).toHaveBeenCalledWith(999);
    });
  });
});
