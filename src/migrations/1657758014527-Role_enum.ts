import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleEnum1657758014527 implements MigrationInterface {
    name = 'RoleEnum1657758014527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" integer`);
    }

}
