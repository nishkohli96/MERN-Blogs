import {
  Controller,
  Get,
  Param,
  Query,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { HomeService } from './home.service';
import { PersonByIdDTO, PersonQueryDTO } from './types';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getPersons(): Promise<string> {
    return this.homeService.getPersons();
  }

  @Get('person/:id')
  getPersonById(@Param() param: PersonByIdDTO): string {
    return this.homeService.getPersonById(param.id);
  }

  @Get('person')
  getPersonBySearch(@Query() query: PersonQueryDTO): string {
    return this.homeService.getPersonBySearch(query.name);
  }

  @Get('file')
  sendSomeFile(@Response({ passthrough: true }) res): StreamableFile {
    /* Process.cwd() gets path of current working directory */
    const file = createReadStream(
      join(process.cwd(), 'src/assets/Project proposal.pdf'),
    );
    res.set({
      'Content-Type': 'application/json',
    });
    return new StreamableFile(file);
  }
}
