import { IsOptional, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class UpdateAddressDto {

  @IsOptional()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  street?: string;
}

class UpdateContactDto {

  @IsOptional()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cell_phone?: string;
}

export class UpdateEnterpriseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({example:"Umbrela corporation"})
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  margin?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id_user?: number;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateContactDto)
  contact?: UpdateContactDto;
}
