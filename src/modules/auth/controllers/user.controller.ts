import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete, 
         UseInterceptors,
         UploadedFile,
         ParseFilePipe,
         MaxFileSizeValidator,
         FileTypeValidator} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from '../services/user.service';

import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update/update-user.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { IEditUserWithUploadAvatarFile, IResponseTransactionBasic, IUser } from '../interfaces/user.interface';
import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { FilesService } from 'src/helpers/files/files.service';
import { Auth } from '../decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../decorators/get-user.decorator';

import { UserResponse, UserSimpleResponse } from '../doc/ResponseUser';
import { PageUserDto } from '../doc/PageUserDto';

@ApiTags("Módulo de Usuarios")
@Controller('user')
export class UserController {
  
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: FilesService
  ) {}

  @Post('/create')
  @Auth('AUTH')
  @ApiResponse({ status: 201, description: "Usuario creado correctamente", type: UserResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async create(
    @Body() createUserDto: CreateUserDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IResponseTransactionBasic | string>> {

    return this.userService.create(createUserDto, user);

  }

  @Get('/get-paginated')
  @Auth('AUTH')
  @ApiResponse({ status: 200, description: "Obteniendo el listado de usuarios", type: PageUserDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener el listado de usuarios" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IUser>> {

    return this.userService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('AUTH')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id del usuario a obtener' })
  @ApiResponse({ status: 200, description: "Usuario obtenido correctamente", type: UserResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener un usuario" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IUser | string>> {

    return this.userService.findOne(id);

  }

  @Post('/update/:id')
  @Auth('AUTH')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id del usuario a actualizar' })
  @ApiResponse({ status: 200, description: "Usuario actualizado correctamente", type: UserResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener un usuario para actualizarlo" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  @ApiResponse({ status: 500, description: "Error en la comunicación con Cloudinary" })
  @UseInterceptors( FileInterceptor('avatar') )
  async update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }), //4 MB
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ]
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: number, 
    @Body() updateUserDto: UpdateUserDto,
    @MyGetUserDecorator() userLog: IUser
  ) {

    let url_cloudinary: string = "";

    //Obtengamos el usuario:
    const getUser: ApiTransactionResponse<IUser | string> = await this.userService.findOne(id);
    const user = getUser.data as IUser;
    let objReg: IEditUserWithUploadAvatarFile;

    if( updateUserDto.changeImageUser == "S" ){

      //Debemos eliminar la imagen que había para no dejar residuos en cloudinary
      if( getUser.data ){
        
        if( user.avatar != null || user.avatar != "default.png" ){
          const arrayName = user.avatar.split('/'); //La url completa separa por /
          const getName = arrayName[arrayName.length - 1]; //Al final tenemos la imagen con su extension
          const [ name , ext ] = getName.split('.'); //Separo la extensión de la imagen y lo que me queda es el nombre de la 
                                                    //imagen, el cual, viene siendo en últimas el mismo id que asigna cloudinary

          //Borramos con una función propia de cloudinary
          await this.cloudinaryService.deleteFile(name);

        }
      }

      let executeFile = this.cloudinaryService.uploadFile(file);

      executeFile.then( p  => {

        url_cloudinary = p.url;

        objReg = {
          id,
          user: updateUserDto.user,
          password: updateUserDto.password,
          avatar: url_cloudinary
        }

        this.userService.update(objReg, userLog);

      })

      return executeFile;

    }else{

      objReg = {
        id,
        user: updateUserDto.user,
        password: updateUserDto.password,
        avatar: user.avatar
      }

      const updateUser = await this.userService.update(objReg, userLog);
      return updateUser;

    }

  }

  @Delete('/remove-logic/:id')
  @Auth('AUTH')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id del usuario a eliminar' })
  @ApiResponse({ status: 200, description: "Usuario eliminado lógicamente correctamente", type: UserResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener un usuario para eliminarlo" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async remove(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IUser | string>> {

    return this.userService.remove(id);

  }

  @Get('/validate-email/:id')
  @Auth('AUTH')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id del usuario a eliminar' })
  @ApiResponse({ status: 200, description: "Email de verificación enviado correctamente", type: UserSimpleResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener un usuario para eliminarlo" })
  async validateEmail(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<boolean | string>> {

    return this.userService.validateEmail(id);

  }

}
