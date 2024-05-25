import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';


export class MetaData {

    @ApiProperty({ example: 1, description: 'Número de página actual' })
    page: number;

    @ApiProperty({ example: 10, description: 'Número de elementos por página' })
    take: number;

    @ApiProperty({ example: 100, description: 'Cantidad de elementos detectados' })
    itemCount: number;
    
    @ApiProperty({ example: 10, description: 'Cantidad de páginas encontradas' })
    pageCount: number;

    @ApiProperty({ example: false, description: '¿Tenemos página anterior?' })
    hasPreviousPage: boolean;

    @ApiProperty({ example: false, description: '¿Tenemos página siguiente?' })
    hasNextPage: boolean;

}

export class PageUserDto {

  @ApiProperty({ type: [User], description: 'Lista de elementos de user' })
  data: User[];

  @ApiProperty({ type: MetaData })
  meta: MetaData;

}