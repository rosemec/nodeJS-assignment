import {MigrationInterface, QueryRunner} from "typeorm";

export class joiningDate1657645058544 implements MigrationInterface {
    name = 'joiningDate1657645058544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
    }

}
