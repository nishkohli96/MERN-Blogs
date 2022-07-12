import { Injectable } from '@nestjs/common';
import * as DBQueries from '../db-config/Queries';
import { PgClient } from '../db-config/DBConfig';

@Injectable()
export class HomeService {
  /* can use async, callback or promise methods to get result */
  async getPersons(): Promise<string> {
    const result = await PgClient.query(DBQueries.GET_ALL_PERSONS);
    console.log(result);
    return 'Hey there! Check console for result';
  }

  getPersonById(id: string) {
    const query = {
      name: 'get-person-by-id',
      text: DBQueries.GET_PERSON_INFO,
      values: [id],
      rowMode: 'array',
    };
    PgClient.query(query, (err, res) => {
      console.log('error: ', err);
      console.log('result: ', res);
    });
    return id;
  }

  getPersonBySearch(srchText: string): string {
    /**
     * When passing parameterised queries in postgres, the 2nd arg must be an array.
     * this is done to avoid SQL Injection.
     */

    PgClient.query(DBQueries.SRCH_PERSON_BY_NAME, [`%${srchText}%`])
      .then((res) => {
        console.log(res);
        return res.rows[0];
      })
      .catch((e) => console.error(e.stack));
    return 'Some value';
  }
}
