comandos para rodar as migrations 

npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/Migration -d typeorm.config.ts \n
 npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d typeorm.config.ts
