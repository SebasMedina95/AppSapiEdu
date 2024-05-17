import { Injectable,
         Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update/update-user.dto';

import { PermitAssignment } from '../entities/permit-assignment.entity';
import { User } from '../entities/user.entity';

import { IResponseTransactionBasic, IUser, IUserWithPermitions } from '../interfaces/user.interface';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { ApiResponse } from 'src/utils/ApiResponse';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PermitAssignment) private readonly permitAssignmentRepository: Repository<PermitAssignment>,
    private readonly dataSource: DataSource,

  ){}

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<IResponseTransactionBasic | string>> {
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      //TODO: Validar que la persona ya no hubiera estado asignada
      

      const resUser = this.userRepository.create({ 
        user: createUserDto.user,
        password: bcrypt.hashSync( createUserDto.password, 10 ),
        createDocumentUserAt: "123456789",
        createDateAt: new Date(),
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
        person: createUserDto.person
      });

      await this.userRepository.save(resUser);
      delete resUser.password;

      if( !resUser ) return new ApiResponse(null, EResponseCodes.FAIL, "Fallo la transacción de creación.");

      const transactionsForPermitions: IUserWithPermitions[] = [];

      for (const rolesTrx of createUserDto.permit) {

        const objSubTransaction: IUserWithPermitions = {
          createDocumentUserAt: "123456789",
          createDateAt: new Date(),
          role: Number(rolesTrx),
          user: Number(resUser.id)
        }

        const resPermitions = this.permitAssignmentRepository.create({ ...objSubTransaction });
        transactionsForPermitions.push(resPermitions as IUserWithPermitions)
        await this.permitAssignmentRepository.save(resPermitions);

      }

      await queryRunner.commitTransaction();

      const factoryResult: IResponseTransactionBasic = {
        userResponse: resUser,
        permitionsResponse: transactionsForPermitions as IUserWithPermitions[]
      }

      return new ApiResponse(factoryResult, EResponseCodes.OK, "Usuario creado correctamente.");
      
    } catch (error) {

      this.logger.error(`${error}, realizando Rollback`);
      await queryRunner.rollbackTransaction();

    } finally {

      this.logger.warn("Transacción de Usuarios");
      await queryRunner.release();

    }
    
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
