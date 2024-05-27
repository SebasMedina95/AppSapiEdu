import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SeedService } from "./seed.service";


@ApiTags('Seed')
@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}

  @Post('execute-seed')
  // @Auth("ADMIN") //Para hacer una ejecución sin necesidad de autorización (Porque estamos en un contenedor Docker)
  executeSeed() {
    return this.seedService.executeSeedForDb()
  }
}
