
export interface ICampus {
    id?: number;
    name: string;
    address: string;
    phone1: string;
    phone2?: string;
    email1: string;
    email2?: string;
    description?: string;
    status: boolean;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
}
