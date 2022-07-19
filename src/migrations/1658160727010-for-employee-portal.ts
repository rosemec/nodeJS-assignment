import {MigrationInterface, QueryRunner} from "typeorm";

export class forEmployeePortal1658160727010 implements MigrationInterface {
    name = 'forEmployeePortal1658160727010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_zip_code"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_zip_code" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2b38914712b726785b85c52bc65" UNIQUE ("address_zip_code")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2b38914712b726785b85c52bc65" FOREIGN KEY ("address_zip_code") REFERENCES "address"("zip_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
