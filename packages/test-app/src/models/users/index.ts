export interface IUser {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
}

export interface IUsersList {
  data: IUser[]
}