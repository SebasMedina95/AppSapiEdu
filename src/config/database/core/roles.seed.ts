
interface IRoles {
    id: number;
    rolName: string;
    description: string;
}

interface SeedData {
    roles: IRoles[];
}

export const initialDataRoles: SeedData = {
    roles: [
        {
            id: 1,
            rolName: "ADMIN",
            description: "Administración y Generación de SEEDs"
        },
        {
            id: 2,
            rolName: "AUTH",
            description: "Autorización y Autenticación"
        },
        {
            id: 3,
            rolName: "BUDGETS_ROUTES",
            description: "Rutas Presupuestales"
        },
        {
            id: 4,
            rolName: "CAMPUS",
            description: "Campus/Sedes"
        },
        {
            id: 5,
            rolName: "CONTROL_ENTITIES",
            description: "Entidades de Control"
        },
        {
            id: 6,
            rolName: "FUNCTIONAL_AREAS",
            description: "Áreas Funcionales"
        },
        {
            id: 7,
            rolName: "FUNDS",
            description: "Fondos de Control Presupuestal"
        },
        {
            id: 8,
            rolName: "MANAGEMENT_CENTERS",
            description: "Centros Gestores de Presupuestos"
        },
        {
            id: 9,
            rolName: "PERSONS",
            description: "Personas - Manejo para Usuarios, Proveedores y por PQRS"
        },
        {
            id: 10,
            rolName: "POS_PRE_ORIGIN",
            description: "Posiciones Presupuestales de Origen"
        },
        {
            id: 11,
            rolName: "POS_PRE_SAPI",
            description: "Posiciones Presupuestales de SapiEdu"
        },
        {
            id: 12,
            rolName: "PROJECTS",
            description: "Gestión de Proyectos"
        },
        {
            id: 13,
            rolName: "PQRS",
            description: "PQRS y Atención al Cliente"
        },
        {
            id: 14,
            rolName: "BALANCES",
            description: "Gestión de Saldos"
        },
        {
            id: 15,
            rolName: "ACTIVITY_DETAILS",
            description: "Actividades Detalladas para los Proyectos"
        }
    ]
}
