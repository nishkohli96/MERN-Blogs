import { Controller, Get, Param, Query } from '@nestjs/common';
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
}
