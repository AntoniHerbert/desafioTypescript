import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1733240960517 implements MigrationInterface {
    name = 'InitialMigration1733240960517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "telephone" character varying(20) NOT NULL, "cell_phone" character varying(20) NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enterprise" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "cnpj" character varying(20) NOT NULL, "company" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "margin" numeric NOT NULL, "id_contact" integer, "id_address" integer, "id_user" integer, CONSTRAINT "UQ_86043f34205352313021ef2bc1d" UNIQUE ("cnpj"), CONSTRAINT "PK_09687cd306dc5d486c0e227c471" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" character varying(10) NOT NULL, "state" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "district" character varying(100) NOT NULL, "street" character varying(255) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "enterprise"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
