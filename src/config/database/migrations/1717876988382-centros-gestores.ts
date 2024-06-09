import { MigrationInterface, QueryRunner } from "typeorm";

export class CentrosGestores1717876988382 implements MigrationInterface {
    name = 'CentrosGestores1717876988382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CEG_CENTROS_GESTORES" ("CEG_CODIGO" SERIAL NOT NULL, "CEG_NOMBRE" character varying(250) NOT NULL, "CEG_DESCRIPCION" character varying(500), "CAM_ESTADO" boolean NOT NULL DEFAULT true, "PER_USUARIO_CREACION" character varying(30), "PER_FECHA_CREACION" TIMESTAMP, "PER_USUARIO_ACTUALIZACION" character varying(30), "PER_FECHA_ACTUALIZACION" TIMESTAMP, CONSTRAINT "PK_0858fb7e1f427f24c1b063b009e" PRIMARY KEY ("CEG_CODIGO")); COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."CEG_CODIGO" IS 'Clave primaria de tabla'; COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."CEG_NOMBRE" IS 'Nombre del centro gestor'; COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."CEG_DESCRIPCION" IS 'Descripción adicional del centro gestor'; COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."CAM_ESTADO" IS 'Estado lógico de eliminación del centro gestor'; COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."PER_USUARIO_CREACION" IS 'Documento de usuario que creó'; COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."PER_FECHA_CREACION" IS 'Fecha creación'; COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."PER_USUARIO_ACTUALIZACION" IS 'Documento de usuario que actualizó'; COMMENT ON COLUMN "CEG_CENTROS_GESTORES"."PER_FECHA_ACTUALIZACION" IS 'Fecha actualización'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "CEG_CENTROS_GESTORES"`);
    }

}
