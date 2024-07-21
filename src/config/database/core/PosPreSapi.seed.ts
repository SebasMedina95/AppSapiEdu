import { PosPreOrigin } from "../../../modules/pos-pre-origin/entities/pos-pre-origin.entity";

interface IPosPreSapi {
    id?: number;
    numberName: string;
    exercise: number;
    description: string;
    consecutive: string;
    assignedTo: string;
    status: boolean;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
    posPreOrigin?: PosPreOrigin | number;
}

interface SeedData {
    posPreSapi: IPosPreSapi[];
}

export const initialDataPorPreSapi: SeedData = {
    posPreSapi: [
        {
            id: 1,
            numberName: "911000000290-001",
            exercise: 2024,
            description: "All the Lorem Ipsum generators on the Internet.",
            consecutive: "001",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 1
        },
        {
            id: 2,
            numberName: "911000000290-002",
            exercise: 2024,
            description: "It uses a dictionary of over 200 Latin words, combined.",
            consecutive: "002",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 1
        },
        {
            id: 3,
            numberName: "911000000290-003",
            exercise: 2024,
            description: "Donec est diam, vehicula a laoreet nec.",
            consecutive: "003",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 1
        },
        {
            id: 4,
            numberName: "911000000290-004",
            exercise: 2024,
            description: "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of.",
            consecutive: "004",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 1
        },
        {
            id: 5,
            numberName: "911000000290-005",
            exercise: 2024,
            description: "Nunc porttitor enim consequat metus iaculis dictum.",
            consecutive: "005",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 1
        },
        {
            id: 6,
            numberName: "911000000290-006",
            exercise: 2024,
            description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
            consecutive: "006",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 1
        },
        {
            id: 7,
            numberName: "911010000290-001",
            exercise: 2024,
            description: "Cras nec consequat ante.",
            consecutive: "001",
            assignedTo: "FUNCIONAMIENTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 2
        },
        {
            id: 8,
            numberName: "911010000290-002",
            exercise: 2024,
            description: "Lorem Ipsum as their default model text, and a search for.",
            consecutive: "002",
            assignedTo: "FUNCIONAMIENTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 2
        },
        {
            id: 9,
            numberName: "911010000290-003",
            exercise: 2024,
            description: "Various versions have evolved over the years.",
            consecutive: "003",
            assignedTo: "FUNCIONAMIENTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 2
        },
        {
            id: 10,
            numberName: "911010000290-004",
            exercise: 2024,
            description: "If you are going to use a passage of Lorem Ipsum, you need to be sure.",
            consecutive: "004",
            assignedTo: "FUNCIONAMIENTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 2
        },
        {
            id: 11,
            numberName: "911020000290-001",
            exercise: 2024,
            description: "Many desktop publishing packages and web page editors now use.",
            consecutive: "001",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 3
        },
        {
            id: 12,
            numberName: "911020000290-002",
            exercise: 2024,
            description: "Suspendisse potenti. Pellentesque fermentum tortor sit amet ligula rhoncus.",
            consecutive: "002",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 3
        },
        {
            id: 13,
            numberName: "911020000290-003",
            exercise: 2024,
            description: "Sed neque nunc, tempor at gravida scelerisque, lacinia fermentum mi.",
            consecutive: "003",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 3
        },
        {
            id: 14,
            numberName: "911020000290-004",
            exercise: 2024,
            description: "Sed luctus augue eu feugiat varius.",
            consecutive: "004",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 3
        },
        {
            id: 15,
            numberName: "911020000290-005",
            exercise: 2024,
            description: "Nulla at justo vitae sapien egestas placerat at non elit.",
            consecutive: "005",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 3
        },
        {
            id: 16,
            numberName: "911020000290-006",
            exercise: 2024,
            description: "Praesent tempus, nisi nec malesuada sollicitudin.",
            consecutive: "006",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 3
        },
        {
            id: 17,
            numberName: "911020000290-007",
            exercise: 2024,
            description: "Aliquam eget ligula elit.",
            consecutive: "007",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 3
        },
        {
            id: 18,
            numberName: "911030000290-001",
            exercise: 2024,
            description: "All the Lorem Ipsum generators on the Internet tend to repeat.",
            consecutive: "001",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 4
        },
        {
            id: 19,
            numberName: "911030000290-002",
            exercise: 2024,
            description: "Lorem Ipsum is therefore always free from repetition.",
            consecutive: "002",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 4
        },
        {
            id: 20,
            numberName: "911030000290-003",
            exercise: 2024,
            description: "Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites.",
            consecutive: "003",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 4
        },
        {
            id: 21,
            numberName: "911030000290-004",
            exercise: 2024,
            description: "The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet'.",
            consecutive: "004",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 4
        },
        {
            id: 22,
            numberName: "911030000290-005",
            exercise: 2024,
            description: "The standard chunk of Lorem Ipsum used since.",
            consecutive: "005",
            assignedTo: "PRESUPUESTO",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 4
        },
        {
            id: 23,
            numberName: "911060000290-001",
            exercise: 2024,
            description: "Sed commodo pulvinar magna ac ornare.",
            consecutive: "001",
            assignedTo: "FONDOS",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 5
        },
        {
            id: 24,
            numberName: "911060000290-002",
            exercise: 2024,
            description: "Nam vel odio purus.",
            consecutive: "002",
            assignedTo: "FONDOS",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 5
        },
        {
            id: 25,
            numberName: "911060000290-003",
            exercise: 2024,
            description: "Nulla lacinia diam a metus efficitur.",
            consecutive: "003",
            assignedTo: "FONDOS",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 5
        },
        {
            id: 26,
            numberName: "911060000290-004",
            exercise: 2024,
            description: "Aliquam erat volutpat. Donec sodales in ante nec suscipit.",
            consecutive: "004",
            assignedTo: "FONDOS",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 5
        },
        {
            id: 27,
            numberName: "911060000290-005",
            exercise: 2024,
            description: "Quisque vitae massa a mauris semper tincidunt ac nec neque.",
            consecutive: "005",
            assignedTo: "FONDOS",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 5
        },
        {
            id: 28,
            numberName: "911060000290-006",
            exercise: 2024,
            description: "Duis vel efficitur quam, eu ultricies libero.",
            consecutive: "006",
            assignedTo: "FONDOS",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 5
        },
        {
            id: 29,
            numberName: "911060000290-007",
            exercise: 2024,
            description: "Nunc in ligula vitae est consectetur hendrerit a non nulla.",
            consecutive: "007",
            assignedTo: "FONDOS",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date(),
            posPreOrigin: 5
        }

    ]
}