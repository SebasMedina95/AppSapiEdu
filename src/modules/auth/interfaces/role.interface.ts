import { PermitAssignment } from "../entities/permit-assignment.entity";

export interface IRole {
    id: number;
    rolName: string;
    description: string;
    permit?: PermitAssignment[];
}
