import { MigrationInterface, QueryRunner } from "typeorm";

export class ControlEntities1717046846359 implements MigrationInterface {
    name = 'ControlEntities1717046846359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ECO_ENTIDADES_CONTROL" ("ECO_CODIGO" SERIAL NOT NULL, "ECO_NOMBRE" character varying(200) NOT NULL, "ECO_DESCRIPCION" character varying(5000), "ECO_ESTADO" boolean NOT NULL DEFAULT true, "ECO_USUARIO_CREACION" character varying(30), "ECO_FECHA_CREACION" TIMESTAMP, "ECO_USUARIO_ACTUALIZACION" character varying(30), "ECO_FECHA_ACTUALIZACION" TIMESTAMP, CONSTRAINT "UQ_c96ea695d1aa4ef4a1512ce0da1" UNIQUE ("ECO_NOMBRE"), CONSTRAINT "PK_9ca03852d54f780a47ebcef0556" PRIMARY KEY ("ECO_CODIGO")); COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_CODIGO" IS 'Clave primaria de tabla'; COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_NOMBRE" IS 'Nombre de la Entidad de Control'; COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_DESCRIPCION" IS 'Descripción de la Entidad de control'; COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_ESTADO" IS 'Estado lógico de eliminación de la Entidad de Control'; COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_USUARIO_CREACION" IS 'Documento de usuario que creó'; COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_FECHA_CREACION" IS 'Fecha creación'; COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_USUARIO_ACTUALIZACION" IS 'Documento de usuario que actualizó'; COMMENT ON COLUMN "ECO_ENTIDADES_CONTROL"."ECO_FECHA_ACTUALIZACION" IS 'Fecha actualización'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ECO_ENTIDADES_CONTROL"`);
    }

}
