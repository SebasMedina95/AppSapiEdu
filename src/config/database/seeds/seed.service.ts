import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import { EResponseCodes } from "src/constants/ResponseCodesEnum";
import { MySqlErrorsExceptions } from "src/helpers/exceptions-sql";
import { ApiTransactionResponse } from "src/utils/ApiResponse";

import { PermitAssignment } from "src/modules/auth/entities/permit-assignment.entity";
import { Role } from "src/modules/auth/entities/role.entity";
import { User } from "src/modules/auth/entities/user.entity";
import { Campus } from "src/modules/campus/entities/campus.entity";
import { Person } from "src/modules/persons/entities/person.entity";

import { initialDataRoles } from "../core/roles.seed";
import { initialDataCampus } from "../core/campus.seed";
import { initialDataPersons } from "../core/persons.seed";
import { initialDataUsers } from "../core/users.seed";
import { initialDataPermits } from "../core/permits.seed";

@Injectable()
export class SeedService {

    private readonly logger = new Logger('SeedService');
    private readonly errorsSQL = new MySqlErrorsExceptions();

    constructor(
        private readonly dataSource: DataSource,
        
        @InjectRepository( Person ) private readonly personRepository: Repository<Person>,
        @InjectRepository( User ) private readonly userRepository: Repository<User>,
        @InjectRepository( Role ) private readonly roleRepository: Repository<Role>,
        @InjectRepository( PermitAssignment ) private readonly permitRepository: Repository<PermitAssignment>,
        @InjectRepository( Campus ) private readonly campusRepository: Repository<Campus>,
    ){}

    async executeSeedForDb(): Promise<ApiTransactionResponse<string | null>> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            //? *************************************
            //? 1. Limpiamos información de tablas
            //? *************************************
            const resultDelete = await this.deleteInformationDb();
            if( !resultDelete || resultDelete == null ){
                await queryRunner.rollbackTransaction();
                return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La transacción del seed fallo en la limpieza de la BD.");
            }

            //? *******************************
            //? 2. Reiniciamos las secuencias
            //? *******************************
            const resultResetSecuence = await this.reseteSecuenceDb();
            if( !resultResetSecuence || resultResetSecuence == null ){
                await queryRunner.rollbackTransaction();
                return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La transacción del seed fallo en el reseteo de las secuencias.");
            }

            //? *******************************
            //? 3. Registramos información
            //? *******************************

            //* ------------------------
            //* 2.1 Registrar roles
            //* ------------------------
            const resultRoles = await this.registerRoles();
            if( !resultRoles || resultRoles == null ){
                this.logger.error(`${resultRoles}, realizando Rollback`);
                await queryRunner.rollbackTransaction();
                return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La transacción del seed fallo en el registro de roles.");
            }

            //* ------------------------
            //* 2.2 Registrar sedes
            //* ------------------------
            const resultCampus = await this.registerCampus();
            if( !resultCampus || resultCampus == null ){
                this.logger.error(`${resultCampus}, realizando Rollback`);
                await queryRunner.rollbackTransaction();
                return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La transacción del seed fallo en el registro de campus.");
            }

            //* ------------------------
            //* 2.3 Registrar personas
            //* ------------------------
            const resultPersons = await this.registerPersons();
            if( !resultPersons || resultPersons == null ){
                this.logger.error(`${resultPersons}, realizando Rollback`);
                await queryRunner.rollbackTransaction();
                return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La transacción del seed fallo en el registro de personas.");
            }

            //* ------------------------
            //* 2.4 Registrar usuarios
            //* ------------------------
            const resultUsers = await this.registerUsers();
            if( !resultUsers || resultUsers == null ){
                this.logger.error(`${resultUsers}, realizando Rollback`);
                await queryRunner.rollbackTransaction();
                return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La transacción del seed fallo en el registro de usuarios.");
            }

            //* --------------------------------------------
            //* 2.5 Registrar los permisos de los usuarios
            //* --------------------------------------------
            const resultPermitsUsers = await this.registerPermitUsers();
            if( !resultPermitsUsers || resultPermitsUsers == null ){
                this.logger.error(`${resultPermitsUsers}, realizando Rollback`);
                await queryRunner.rollbackTransaction();
                return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La transacción del seed fallo en el registro de permisos de usuarios.");
            }

            //Genero la transacción completa
            await queryRunner.commitTransaction();

            return new ApiTransactionResponse("SEED EJECUTADO", EResponseCodes.OK, "El Seed se ejecutó de manera satisfactoria.");
            
        } catch (error) {

            this.logger.error(`${error}, realizando Rollback`);
            await queryRunner.rollbackTransaction();

            const fail: string = await this.errorsSQL.handleDbExceptions(error);

            return new ApiTransactionResponse(
                fail,
                EResponseCodes.FAIL,
                "No se pudo ejecutar adecuadamente el SEED."
            );
            
        } finally {

            this.logger.warn("Ejecución de SEED");
            await queryRunner.release();

        }

    }

    private async deleteInformationDb(): Promise<string | null> {

        //* 1. Eliminamos asignaciones de roles
        const queryBuilderAssignamentRoles = this.permitRepository.createQueryBuilder();
        await queryBuilderAssignamentRoles.delete().where({}).execute();

        //* 2. Eliminamos los roles
        const queryBuilderRoles = this.roleRepository.createQueryBuilder();
        await queryBuilderRoles.delete().where({}).execute();

        //* 3. Eliminamos usuarios
        const queryBuilderUsers = this.userRepository.createQueryBuilder();
        await queryBuilderUsers.delete().where({}).execute();

        //* 4. Eliminamos personas
        const queryBuilderPersons = this.personRepository.createQueryBuilder();
        await queryBuilderPersons.delete().where({}).execute();

        //* 5. Eliminamos campus
        const queryBuilderCampus = this.campusRepository.createQueryBuilder();
        await queryBuilderCampus.delete().where({}).execute();

        return "OK"

    }

    private async reseteSecuenceDb(): Promise<string | null> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        const sequences = await queryRunner.query(`
            SELECT sequence_name
            FROM information_schema.sequences
            WHERE sequence_schema = 'public';
        `);

        let count: number = 0;
        for (const { sequence_name } of sequences) {
            //La posición 0 son las migraciones, esas si no las tocamos
            if( count != 0 )
                await queryRunner.query(`ALTER SEQUENCE "${sequence_name}" RESTART WITH 1`);
            count ++;
        }

        return "OK";

    }

    private async registerPersons(): Promise<string | null> {

        try {

            const persons = initialDataPersons.persons;
            await this.personRepository.save(persons);

            return "OK"

        } catch (error) {

            this.logger.warn(error);
            return null;

        }

    }

    private async registerRoles(): Promise<string | null> {

        try {

            const roles = initialDataRoles.roles;
            await this.roleRepository.save(roles);

            return "OK"

        } catch (error) {

            this.logger.warn(error);
            return null;

        }

    }

    private async registerUsers(): Promise<string | null> {

        try {

            const users = initialDataUsers.users;
            await this.userRepository.save(users);

            return "OK"

        } catch (error) {

            this.logger.warn(error);
            return null;

        }

    }

    private async registerCampus(): Promise<string | null> {

        try {

            const campus = initialDataCampus.campus;
            await this.campusRepository.save(campus);

            return "OK"

        } catch (error) {

            this.logger.warn(error);
            return null;

        }

    }

    private async registerPermitUsers(): Promise<string | null> {

        try {

            const permits = initialDataPermits.permits;
            await this.permitRepository.save(permits);

            return "OK"

        } catch (error) {

            this.logger.warn(error);
            return null;

        }

    }

}
