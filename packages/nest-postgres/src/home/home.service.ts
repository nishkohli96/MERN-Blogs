import { Injectable } from '@nestjs/common';
import { GET_ALL_PERSONS } from '../db-config/Queries';
import { PgClient } from '../db-config/DBConfig';

@Injectable()
export class HomeService {
  getHello(): string {
    PgClient.query(GET_ALL_PERSONS, (err, res) => {
      console.log(err, res);
    });
    return 'Hello World!';
  }
}
