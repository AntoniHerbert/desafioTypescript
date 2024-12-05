// src/enterprise/enterprise.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from 'src/entities/enterprise.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@ApiTags('enterprise')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The enterprise has been successfully created.' })
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return await this.enterpriseService.create(createEnterpriseDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'All enterprises.', type: [Enterprise] })
  async findAll() {
    return await this.enterpriseService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The found enterprise.', type: Enterprise })
  async findOne(@Param('id') id: string) {
    return await this.enterpriseService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The enterprise has been updated.' })
  async update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
    return await this.enterpriseService.update(+id, updateEnterpriseDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The enterprise has been deleted.' })
  async remove(@Param('id') id: string) {
    return await this.enterpriseService.remove(+id);
  }
}
