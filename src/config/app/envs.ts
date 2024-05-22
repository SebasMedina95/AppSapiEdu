import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    //*** PUERTO DE LA APLICACIÓN ***//
    PORT: get('PORT').required().asPortNumber(),

    //*** CONFIGURACIÓN BASE DE DATOS ***//
    DB_USER: get('DB_USER').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),
    DB_PORT: get('DB_PORT').required().asPortNumber(),
    DB_HOST: get('DB_HOST').required().asString(),
    DB_TYPE: get('DB_TYPE').required().asString(),

    //*** URL GENERAL ***//
    WEB_SERVICE_URL: get('WEB_SERVICE_URL').required().asString(),

    //*** EMAIL ***//
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    SEND_EMAIL: get('SEND_EMAIL').required().asBool(),

    //*** IMAGENES CLOUDINARY ****//
    CLOUDINARY_NAME: get('CLOUDINARY_NAME').required().asString(),
    CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').required().asString(),

    //*** PARA EL MANEJO DE LOS JWT ***//
    JWT_SECRET: get('JWT_SECRET').required().asString(),

}