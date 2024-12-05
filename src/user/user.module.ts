// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Enterprise } from 'src/entities/enterprise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Enterprise])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
