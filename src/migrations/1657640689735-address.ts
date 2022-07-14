import {MigrationInterface, QueryRunner} from "typeorm";

export class address1657640689735 implements MigrationInterface {
    name = 'address1657640689735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "zip_code" SERIAL NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_5b55202de98ecd89065a33b3889" PRIMARY KEY ("zip_code"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "zip_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_zip_code" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2b38914712b726785b85c52bc65" UNIQUE ("address_zip_code")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2b38914712b726785b85c52bc65" FOREIGN KEY ("address_zip_code") REFERENCES "Address"("zip_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2b38914712b726785b85c52bc65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_zip_code"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "zip_code"`);
        await queryRunner.query(`DROP TABLE "Address"`);
    }

}
