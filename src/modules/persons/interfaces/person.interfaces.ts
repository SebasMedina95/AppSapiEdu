import { ICampus } from "src/modules/campus/interfaces/campus.interfaces";

export interface IPerson {
    id?: number;
    campus?: ICampus | number;
    documentType: string;
    document: string;
    names: string;
    lastNames: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    birthDate: Date;
    bloodType: string;
    type: string;
    status: boolean;
    createUserAt?: string;
    createDateAt?: Date;
    updateUserAt?: string;
    updateDateAt?: Date;
}
