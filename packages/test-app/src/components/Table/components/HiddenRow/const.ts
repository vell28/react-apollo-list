import * as valid from '../../../../utils';

export const SAVE: string = 'save changes';
export const FIELDS_NAME = [ 'name', 'surname', 'age', 'email' ];
export const ERROR_TEXT = 'User was not update';

export const VALIDATE: { [ket: string]: { [ket: string]: (val: string) => string | boolean |void } } = {
  name: {
    formatter: (val: string) => valid.onlyCharacters(val),
  },
  surname: {
    formatter: (val: string) => valid.onlyCharacters(val),
  },
  age: {
    formatter: (val: string) => valid.onlyNumbers(val),
    validate: (val: string) => valid.validateAge(val), 
  },
  email: {
    validate: (val: string): boolean => valid.validateEmail(val),
  }
}