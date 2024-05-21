import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagesAvatarForUser1716259984261 implements MigrationInterface {
    name = 'AddImagesAvatarForUser1716259984261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USU_USUARIO" ADD "USU_AVATAR" character varying DEFAULT 'default.png'`);
        await queryRunner.query(`COMMENT ON COLUMN "USU_USUARIO"."USU_AVATAR" IS 'Imagen del usuario'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "USU_USUARIO"."USU_AVATAR" IS 'Imagen del usuario'`);
        await queryRunner.query(`ALTER TABLE "USU_USUARIO" DROP COLUMN "USU_AVATAR"`);
    }

}
