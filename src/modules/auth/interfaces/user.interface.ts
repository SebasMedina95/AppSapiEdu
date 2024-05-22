import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity";
import { Person } from "src/modules/persons/entities/person.entity";
import { PermitAssignment } from "../entities/permit-assignment.entity";

export interface IUser {
    id?: number;
    user: string;
    password: string;
    status?: boolean;
    isValid?: boolean;
    avatar?: string;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
    person?: Person | number;
    permit?: PermitAssignment[]
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

export interface IEditUserWithUploadAvatarFile {
    id: number;
    user: string;
    password: string;
    avatar?: string;
    changeImageUser?: string;
}

export interface IUserAuthenticated {
    user: IUser;
    token: string;
}
