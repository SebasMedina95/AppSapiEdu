import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity";

export interface IPermit {
    id: number;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    role?: Role[];
    user?: User
}
