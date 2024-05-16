import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatusPerson1715798269817 implements MigrationInterface {
    name = 'ChangeStatusPerson1715798269817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" ALTER COLUMN "PER_ESTADO" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PER_PERSONAS" ALTER COLUMN "PER_ESTADO" SET DEFAULT 'S'`);
    }

}
