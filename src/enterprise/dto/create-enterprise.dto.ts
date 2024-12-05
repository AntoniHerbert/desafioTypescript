import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;
}

class CreateContactDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telephone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cell_phone: string;
}

export class CreateEnterpriseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @ApiProperty({example:"Umbrela corporation"})
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  margin: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_user: number;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateContactDto)
  contact: CreateContactDto;
}
