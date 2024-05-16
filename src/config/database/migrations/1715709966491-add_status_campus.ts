import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusCampus1715709966491 implements MigrationInterface {
    name = 'AddStatusCampus1715709966491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CAM_CAMPUS" ADD "CAM_ESTADO" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`COMMENT ON COLUMN "CAM_CAMPUS"."CAM_ESTADO" IS 'Estado lógico de eliminación de la Sede'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "CAM_CAMPUS"."CAM_ESTADO" IS 'Estado lógico de eliminación de la Sede'`);
        await queryRunner.query(`ALTER TABLE "CAM_CAMPUS" DROP COLUMN "CAM_ESTADO"`);
    }

}
