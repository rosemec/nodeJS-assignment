import {MigrationInterface, QueryRunner} from "typeorm";

export class empIdAdded1658207048708 implements MigrationInterface {
    name = 'empIdAdded1658207048708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "emp_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "emp_id"`);
    }

}
