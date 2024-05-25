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
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../services/user.service';

import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update/update-user.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { IEditUserWithUploadAvatarFile, IResponseTransactionBasic, IUser } from '../interfaces/user.interface';
import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/helpers/files/files.service';

@ApiTags("Módulo de Usuarios")
@Controller('user')
export class UserController {
  
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: FilesService
  ) {}

  @Post('/create')
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ApiTransactionResponse<IResponseTransactionBasic | string>> {

    return this.userService.create(createUserDto);

  }

  @Get('/get-paginated')
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IUser>> {

    return this.userService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IUser | string>> {

    return this.userService.findOne(id);

  }

  @Post('/update/:id')
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
    @Body() updateUserDto: UpdateUserDto
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

        this.userService.update(objReg);

      })

      return executeFile;

    }else{

      objReg = {
        id,
        user: updateUserDto.user,
        password: updateUserDto.password,
        avatar: user.avatar
      }

      const updateUser = await this.userService.update(objReg);
      return updateUser;

    }

  }

  @Delete('/remove-logic/:id')
  async remove(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IUser | string>> {

    return this.userService.remove(id);

  }

  @Get('/validate-email/:id')
  async validateEmail(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<boolean | string>> {

    return this.userService.validateEmail(id);

  }

}
