import { MigrationInterface, QueryRunner } from "typeorm";

export class FinalMigration1733245948500 implements MigrationInterface {
    name = 'FinalMigration1733245948500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enterprise" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "enterprise" ADD CONSTRAINT "FK_0bdbf1e83259d934b7b862a0603" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enterprise" ADD CONSTRAINT "FK_711ddee690bca427dedc36401bd" FOREIGN KEY ("id_contact") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enterprise" ADD CONSTRAINT "FK_6ebd7cb5403b6a4ac1bf83ce0fa" FOREIGN KEY ("id_address") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise" DROP CONSTRAINT "FK_6ebd7cb5403b6a4ac1bf83ce0fa"`);
        await queryRunner.query(`ALTER TABLE "enterprise" DROP CONSTRAINT "FK_711ddee690bca427dedc36401bd"`);
        await queryRunner.query(`ALTER TABLE "enterprise" DROP CONSTRAINT "FK_0bdbf1e83259d934b7b862a0603"`);
        await queryRunner.query(`ALTER TABLE "enterprise" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "enterprise" ALTER COLUMN "updatedAt" SET NOT NULL`);
    }

}
