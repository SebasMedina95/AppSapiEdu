
interface ICampus {
    id?: number;
    name: string;
    address: string;
    phone1: string;
    phone2?: string;
    email1: string;
    email2?: string;
    description: string;
    status: boolean;
    createDocumentUserAt?: string;
    createDateAt?: Date;
    updateDocumentUserAt?: string;
    updateDateAt?: Date;
}

interface SeedData {
    campus: ICampus[];
}

export const initialDataCampus: SeedData = {
    campus: [
        {
            id: 1,
            name: "Sede Paramero A - Continental",
            address: "Carrera 312A # 45 - 412B",
            phone1: "6043219909",
            phone2: "3128109910",
            email1: "atencionalcliente_sedeparamero@correo.com",
            email2: "orlandocasadelocos@correo.com",
            description: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 2,
            name: "Sede Pendular Barrera - CC Yakusa",
            address: "Calle 25D # 132 - 444C",
            phone1: "6044329122",
            phone2: "3156549043",
            email1: "atencionalcliente_sedependular@correo.com",
            email2: "",
            description: "Lorem Ipsum es simplemente el texto de relleno de las imprentas. Ha sido el texto de relleno estándar de las industrias desde el año 1500.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 3,
            name: "Sede Octagonal Valenzuela - Edf. Galindo",
            address: "Carrera 565A # 45 - 220D",
            phone1: "6043218532",
            phone2: "3128910231",
            email1: "atencionalcliente_sedeoctagonal@correo.com",
            email2: "",
            description: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en la literatura del Latin.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 4,
            name: "Sede Talibomba Sur - Edf. Los Viejos",
            address: "Calle 1902A # 3121C - 311",
            phone1: "6048932219 - 6042891101",
            phone2: "3167281192",
            email1: "atencionalcliente_sedetalibomba@correo.com",
            email2: "",
            description: "Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        },
        {
            id: 5,
            name: "Sede Galimbuena Norte - CC. Llanos Pargados",
            address: "Carrera 555C # 433A - Local 111",
            phone1: "6045472291",
            phone2: "3127811922",
            email1: "atencionalcliente_sedegalimbuena@correo.com",
            email2: "",
            description: "Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: new Date(),
            updateDocumentUserAt: "123456789",
            updateDateAt: new Date()
        }
    ]
}
