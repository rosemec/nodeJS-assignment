import {MigrationInterface, QueryRunner} from "typeorm";

export class stringExperience1658207622671 implements MigrationInterface {
    name = 'stringExperience1658207622671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying NOT NULL DEFAULT '0 Years'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL DEFAULT '0'`);
    }

}
