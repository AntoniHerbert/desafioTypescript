import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'enterprise_db',
  entities: ['src/**/*.entity.ts'], // Aponta para os arquivos TS
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
