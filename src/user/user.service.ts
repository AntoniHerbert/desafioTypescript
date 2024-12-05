// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // Criar um novo usuário
  async create(data: any) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  // Buscar todos os usuários
  async findAll() {
    return await this.userRepository.find({
      relations: ['enterprises'], // Retorna as empresas relacionadas
    });
  }

  // Buscar usuário por ID e suas empresas
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['enterprises'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Atualizar um usuário
  async update(id: number, data: any) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update(id, data);
    return await this.findOne(id);
  }

  // Apagar um usuário e suas empresas associadas
  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.delete(id);
  }
}
