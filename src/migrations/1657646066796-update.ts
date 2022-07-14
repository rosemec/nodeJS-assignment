import {MigrationInterface, QueryRunner} from "typeorm";

export class update1657646066796 implements MigrationInterface {
    name = 'update1657646066796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "zip_code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "zip_code" character varying NOT NULL`);
    }

}
