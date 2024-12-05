// src/user/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example:"shaulim matador de porco"})  
  @IsString()
  @IsNotEmpty()
  name: string;
}
