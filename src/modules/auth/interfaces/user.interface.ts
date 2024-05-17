import { IPerson } from "src/modules/persons/interfaces/person.interfaces";
import { IPermit } from "./permit-assignment.interface";
import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity";

export interface IUser {
    id?: number;
    user: string;
    password: string;
    status?: boolean;
    isValid?: boolean;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
    person?: IPerson | number;
    permit?: IPermit[]
}

export interface IUserWithPermitions {

    id?: number;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    role: Role | number;
    user: User | number;

}

export interface IResponseTransactionBasic {
    userResponse: IUser | User;
    permitionsResponse: IUserWithPermitions[];
}
