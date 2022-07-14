import {MigrationInterface, QueryRunner} from "typeorm";

export class primarykey1657709222331 implements MigrationInterface {
    name = 'primarykey1657709222331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "address_zip_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2b38914712b726785b85c52bc65" FOREIGN KEY ("address_zip_code") REFERENCES "address"("zip_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "address_zip_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2b38914712b726785b85c52bc65" FOREIGN KEY ("address_zip_code") REFERENCES "address"("zip_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
