
export interface IPerson {
    id?: number;
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
    status: string;
    createUserAt?: string;
    createDateAt?: Date;
    updateUserAt?: string;
    updateDateAt?: Date;
}
