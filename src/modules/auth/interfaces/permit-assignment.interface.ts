import { IRole } from "./role.interface";
import { IUser } from "./user.interface";

export interface IPermit {
    id: number;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    role?: IRole[];
    user?: IUser
}
