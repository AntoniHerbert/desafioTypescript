import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { User } from './entities/user.entity';
import { Enterprise } from './entities/enterprise.entity';
import { Contact } from './entities/contact.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // ou 'mysql' se você estiver usando MySQL
      host: 'localhost',
      port: 5432, // ou 3306 para MySQL
      username: 'postgres',
      password: 'postgres',
      database: 'enterprise_db',
      entities: [User, Enterprise, Contact, Address],
      synchronize: true, // Cuide ao rodar em produção. Deve ser 'false' em produção para evitar perda de dados.
    }),
    UserModule,
    EnterpriseModule,
  ],
})
export class AppModule {}
