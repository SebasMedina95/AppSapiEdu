import { Injectable, Logger } from "@nestjs/common";
import { MySqlErrorsExceptions } from "../exceptions-sql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Role } from "src/modules/auth/entities/role.entity";
import { ApiTransactionResponse } from "src/utils/ApiResponse";
import { IRole } from "src/modules/auth/interfaces/role.interface";
import { EResponseCodes } from "src/constants/ResponseCodesEnum";


@Injectable()
export class RolesService {

    private readonly logger = new Logger('RolesService');
    private readonly errorsSQL = new MySqlErrorsExceptions();

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async getRoles(): Promise<ApiTransactionResponse<IRole[] | null>> {

        const queryBuilder = this.roleRepository.createQueryBuilder("role");
        const { entities } = await queryBuilder.getRawAndEntities();
        const getRoles: IRole[] = entities as IRole[];

        if( !getRoles || getRoles.length == 0 )
            return new ApiTransactionResponse(null, EResponseCodes.FAIL, "No se pudieron encontrar roles para sistema");

        return new ApiTransactionResponse(getRoles, EResponseCodes.OK, "Roles obtenidos");

    }

    

}