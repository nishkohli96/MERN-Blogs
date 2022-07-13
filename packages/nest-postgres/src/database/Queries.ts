/* Avoid using ` operator in postgres */
export const GET_ALL_PERSONS = 'SELECT * FROM person';

export const GET_PERSON_INFO = 'SELECT * FROM person where id = $1';

export const SRCH_PERSON_BY_NAME = 'SELECT name FROM person WHERE name LIKE $1';
