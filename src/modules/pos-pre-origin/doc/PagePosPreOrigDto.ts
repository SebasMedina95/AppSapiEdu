import { ApiProperty } from '@nestjs/swagger';
import { PosPreOrigin } from '../entities/pos-pre-origin.entity';


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

export class PagePosPreOrignDto {

  @ApiProperty({ type: [PosPreOrigin], description: 'Lista de elementos de posiciones presupuestales de origen' })
  data: PosPreOrigin[];

  @ApiProperty({ type: MetaData })
  meta: MetaData;

}