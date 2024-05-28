import * as bcrypt from 'bcrypt';

interface IUsers {
    id: number;
    user: string;
    password: string;
    status: boolean;
    isValid: boolean;
    avatar: string;
    person?: number
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
}

interface SeedData {
    users: IUsers[];
}

export const initialDataUsers: SeedData = {
    users: [
        {
            id: 1,
            user: "Sebastian123",
            password: bcrypt.hashSync( "Sebastian123", 10 ),
            status: true,
            isValid: true,
            avatar: "default.png",
            person: 9,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 2,
            user: "Fabio123",
            password: bcrypt.hashSync( "Fabio123", 10 ),
            status: true,
            isValid: true,
            avatar: "default.png",
            person: 10,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 3,
            user: "Monica123",
            password: bcrypt.hashSync( "Monica123", 10 ),
            status: true,
            isValid: true,
            avatar: "default.png",
            person: 12,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 4,
            user: "JoelAr123",
            password: bcrypt.hashSync( "JoelAr123", 10 ),
            status: true,
            isValid: false,
            avatar: "default.png",
            person: 13,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        }
    ]
}
