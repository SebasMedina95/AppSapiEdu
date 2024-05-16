import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypesPersons1715798026513 implements MigrationInterface {
    name = 'AddTypesPersons1715798026513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" ADD "PER_TIPO" character varying(2) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "PER_PERSONAS"."PER_TIPO" IS 'Tipo de persona'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "PER_PERSONAS"."PER_TIPO" IS 'Tipo de persona'`);
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" DROP COLUMN "PER_TIPO"`);
    }

}
