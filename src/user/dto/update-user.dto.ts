// src/user/dto/update-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({example: "shaulim matador de porco"}) 
  @IsString()
  @IsOptional()
  name?: string;
}
