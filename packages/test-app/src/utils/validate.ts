export type ValidationFunc<P, T> = (value: P) => T;

const MIN_AGE: number = 18;
const MAX_AGE: number = 100;

export const email = /^\S+@\S+$/;

export const validateEmail: ValidationFunc<string, boolean> = (value: string) => email.test(value);
export const onlyNumbers: ValidationFunc<string, string> = (value: string) => value.replace(/\D/g, '');
export const onlyCharacters: ValidationFunc<string, string> = (value: string) => value.replace(/[^a-zA-Z]/gi, '');
export const validateAge: ValidationFunc<string, boolean> = (value: string) => Number(value) < MAX_AGE && Number(value) > MIN_AGE ;