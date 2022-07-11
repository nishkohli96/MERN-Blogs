import { Injectable } from '@nestjs/common';
import * as DBQueries from '../db-config/Queries';
import { PgClient } from '../db-config/DBConfig';

@Injectable()
export class HomeService {
  getHello(): string {
    PgClient.query(DBQueries.GET_ALL_PERSONS, (err, res) => {
      console.log(err, res);
    });
    return 'Hello World!';
  }

  getPersonById(id: string) {
    /* When passing parameterised queries in postgres, the 2nd arg must be an array */
    PgClient.query(DBQueries.GET_PERSON_INFO, [id], (err, res) => {
      console.log(err, res);
    });
    return id;
  }
}
