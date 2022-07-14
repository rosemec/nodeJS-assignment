import {MigrationInterface, QueryRunner} from "typeorm";

export class primarykey1657687646419 implements MigrationInterface {
    name = 'primarykey1657687646419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_6c538d71d7e40e2da86a9ded9b9"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zip_code"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zip_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_6c538d71d7e40e2da86a9ded9b9" PRIMARY KEY ("zip_code")`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_zip_code"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_zip_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2b38914712b726785b85c52bc65" UNIQUE ("address_zip_code")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2b38914712b726785b85c52bc65" FOREIGN KEY ("address_zip_code") REFERENCES "address"("zip_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_zip_code"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_zip_code" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2b38914712b726785b85c52bc65" UNIQUE ("address_zip_code")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_6c538d71d7e40e2da86a9ded9b9"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zip_code"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zip_code" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_6c538d71d7e40e2da86a9ded9b9" PRIMARY KEY ("zip_code")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2b38914712b726785b85c52bc65" FOREIGN KEY ("address_zip_code") REFERENCES "address"("zip_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
