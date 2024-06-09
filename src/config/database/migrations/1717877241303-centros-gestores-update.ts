import { MigrationInterface, QueryRunner } from "typeorm";

export class CentrosGestoresUpdate1717877241303 implements MigrationInterface {
    name = 'CentrosGestoresUpdate1717877241303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CEG_CENTROS_GESTORES" ADD CONSTRAINT "UQ_1bf55ff00dc29cecbd04907dc27" UNIQUE ("CEG_NOMBRE")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CEG_CENTROS_GESTORES" DROP CONSTRAINT "UQ_1bf55ff00dc29cecbd04907dc27"`);
    }

}
