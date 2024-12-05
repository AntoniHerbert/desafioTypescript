// src/user/user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'All users.', type: [User] })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The found user.', type: User })
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The user has been updated.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The user has been deleted.' })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
