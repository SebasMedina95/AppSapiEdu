interface IControlEntity {
    id?: number
    name: string
    description: string
    status: boolean
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
}

interface SeedData {
    controlEntity: IControlEntity[];
}

export const initialDataControlEntities: SeedData = {
    controlEntity: [
        {
            id: 1,
            name: "Entidad para la gestión de Fondos",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
        },
        {
            id: 2,
            name: "Entidad para la gestión de Proyectos de Inversión",
            description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
        },
        {
            id: 3,
            name: "Entidad para las Poblaciones Vulnerables",
            description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
        }
    ]
}