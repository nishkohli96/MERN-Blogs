import { Controller, Get, Param } from '@nestjs/common';
import { HomeService } from './home.service';
import { GetPersonById } from './types';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHello(): string {
    return this.homeService.getHello();
  }

  @Get('person/:id')
  getPersonById(@Param() param: GetPersonById): string {
    console.log('param: ', param);
    return this.homeService.getPersonById(param.id);
  }
}
