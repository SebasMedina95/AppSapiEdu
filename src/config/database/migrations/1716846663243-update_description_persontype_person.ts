import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDescriptionPersontypePerson1716846663243 implements MigrationInterface {
    name = 'UpdateDescriptionPersontypePerson1716846663243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" ALTER COLUMN "PER_TIPO_SANGRE" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "PER_PERSONAS"."PER_TIPO" IS 'Tipo de persona (A1 por APP, A2 por PQRS, A3 por Otro)'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "PER_PERSONAS"."PER_TIPO" IS 'Tipo de persona'`);
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" ALTER COLUMN "PER_TIPO_SANGRE" SET NOT NULL`);
    }

}
