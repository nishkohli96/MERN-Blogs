/* Avoid using ` operator in postgres */
export const GET_ALL_PERSONS = 'SELECT * FROM person';

export const GET_PERSON_INFO = 'SELECT * FROM person where id = $1'