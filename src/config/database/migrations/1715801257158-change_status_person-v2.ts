import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatusPersonV21715801257158 implements MigrationInterface {
    name = 'ChangeStatusPersonV21715801257158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" DROP COLUMN "PER_ESTADO"`);
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" ADD "PER_ESTADO" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`COMMENT ON COLUMN "PER_PERSONAS"."PER_ESTADO" IS 'Estado Lógico de la Persona'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "PER_PERSONAS"."PER_ESTADO" IS 'Estado Lógico de la Persona'`);
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" DROP COLUMN "PER_ESTADO"`);
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" ADD "PER_ESTADO" character varying(1) NOT NULL DEFAULT true`);
    }

}
