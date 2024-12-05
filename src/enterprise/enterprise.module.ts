import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { Enterprise } from '../entities/enterprise.entity';
import { Contact } from '../entities/contact.entity';
import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enterprise, Contact, Address, User]), // Certifique-se de que Enterprise está incluído aqui
  ],
  providers: [EnterpriseService],
  controllers: [EnterpriseController],
})
export class EnterpriseModule {}
