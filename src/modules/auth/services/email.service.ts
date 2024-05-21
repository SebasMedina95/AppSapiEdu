import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as nodemailer from 'nodemailer';
import { envs } from "src/config/app/envs";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { PermitAssignment } from "../entities/permit-assignment.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

interface Attachement {
  filename: string;
  path: string;
}

@Injectable()
export class EmailService {

    private readonly logger = new Logger('EmailService');
    private transporter: nodemailer.Transporter;
  
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(PermitAssignment) private readonly permitAssignmentRepository: Repository<PermitAssignment>,
    ) {

        const mailerService: string = envs.MAILER_SERVICE;
        const mailerEmail: string = envs.MAILER_EMAIL;
        const mailerSecretKey: string = envs.MAILER_SECRET_KEY;

        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerSecretKey,
            }
        });

        // console.log({mailerService});
        // console.log({mailerEmail});
        // console.log({mailerSecretKey});

    }

    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {

            if( !envs.SEND_EMAIL ) return true;

            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });

            return true;

        } catch ( error ) {

            return false;

        }

    }

    async sendEmailValidationUser( userId: number, 
                                   email: string,
                                   names: string,
                                   lastNames: string,
                                   user: string, 
                                   password: string ): Promise<boolean> {

        console.log({userId});
        console.log({email});
        console.log({user});
        console.log({password});
        
        const link = `${ envs.WEB_SERVICE_URL }/user/validate-email/${ userId }`;

        const html = `

            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Verificación de Correo Electrónico</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 40px 0;">
                            <img src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-email-icon-png-image_1757854.jpg" alt="Email Icon" width="80" style="display: block;"/>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 20px;">
                            <h1 style="color: #333333; margin-top: 0;">Verificación de Correo Electrónico</h1>
                            <p style="color: #666666;">
                                Cordial saludo ${names} ${lastNames}. 
                                Para completar el proceso de verificación y poder gestionar su usuario para SapiEdu, 
                                por favor haz clic en el botón de abajo.
                            </p>
                            <a href="${ link }" 
                               style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; 
                               border-radius: 4px; display: inline-block;">
                                Verificar Correo Electrónico
                            </a>
                            <p style="color: #666666; margin-top: 20px;">Si no puedes hacer clic en el botón, copia y pega la siguiente URL en tu navegador:</p>
                            <p style="color: #007bff; margin-top: 10px;"><a href="${ link }" style="color: #007bff; text-decoration: underline;">${ link }</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 20px;">
                            <h1 style="color: #333333; margin-top: 0;">Credenciales Dispuestas:</h1>
                            <p style="color: #666666;">
                                Su usuario para ingresar al sistema es:
                                <h3 style="color: #1DDB34; margin-top: 0;"> ${ user } </h3>
                            </p>
                            <p style="color: #666666;">
                                Su contraseña para ingresar al sistema es:
                                <h3 style="color: #1DDB34; margin-top: 0;"> ${ password } </h3>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" style="padding: 20px; text-align: center;">
                            <p style="color: #666666; margin: 0;">
                                Este correo electrónico fue enviado desde la aplicación de SapiEdu (API RESTful - NestJS).
                                Confirmación del correo electrónico: ${ email }
                                <b>Si se trata de un error por favor ignore este correo</b>
                            </p>

                        </td>
                    </tr>
                </table>
            </body>
            </html>

        `;

        const options = {
            to: email,
            subject: "Validación de Email",
            htmlBody: html
        }

        const isSent = await this.sendEmail( options );
        if( !isSent ) return false;

        return true;

    }



}