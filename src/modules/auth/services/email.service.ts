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

    async sendEmailValidationUser( userId: number ): Promise<boolean> {

        const link = `${ envs.WEB_SERVICE_URL }/user/validate-email/${ userId }`;

        //TODO: Ubicar información clave de usuario y persona

        //TODO: Crear el cuerpo del HTML
        const html = ``;

        const options = {
            to: "email",
            subject: "Validación de Email",
            htmlBody: html
        }

        console.log({options, link});
        // const isSent = await this.sendEmail( options );
        // if( !isSent ) return false;

        return true;

    }



}