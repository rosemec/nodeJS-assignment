import {MigrationInterface, QueryRunner} from "typeorm";

export class update31657646770851 implements MigrationInterface {
    name = 'update31657646770851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "zip_code" SERIAL NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_6c538d71d7e40e2da86a9ded9b9" PRIMARY KEY ("zip_code"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2b38914712b726785b85c52bc65" FOREIGN KEY ("address_zip_code") REFERENCES "address"("zip_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
