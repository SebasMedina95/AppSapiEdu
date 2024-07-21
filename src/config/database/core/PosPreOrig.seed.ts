interface IPosPreOrigin {
    id?: number;
    numberName: string;
    exercise: number;
    denomination: string;
    description: string;
    status: boolean;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
}

interface SeedData {
    posPreOrig: IPosPreOrigin[];
}

export const initialDataPorPreOrg: SeedData = {
    posPreOrig: [
        {
            id: 1,
            numberName: "911000000290",
            exercise: 2024,
            denomination: "Lorem Ipsum has been the industry's, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 
            description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 2,
            numberName: "911010000290",
            exercise: 2024,
            denomination: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 3,
            numberName: "911020000290",
            exercise: 2024,
            denomination: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model.",
            description: "Various versions have evolved over the years, sometimes by accident, sometimes on purpose.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 4,
            numberName: "911030000290",
            exercise: 2024,
            denomination: "Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
            description: "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero,",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 5,
            numberName: "911060000290",
            exercise: 2024,
            denomination: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from.",
            description: "Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        }
    ]
}