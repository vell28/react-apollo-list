import { Injectable } from '@graphql-modules/di';

import list from './data.json';

type User = {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
}

@Injectable()
export class UsersProvider {
  
  usersList: User[] = list;
  
  public deleteUser(id: string) {
    this.usersList = this.usersList.filter(user => user.id !== id);
    return true; 
  }
  
  public updateUser(updatableUser: User) {
    this.usersList = this.usersList.map(user => user.id === updatableUser.id ? updatableUser : user);
    return updatableUser; 
  }

  public getUsers({ field, order, offset, limit }:{ field: string; order: string; offset: number; limit: number; }) {
    let userList = this.usersList.slice();
    if (field && order) {
      userList = userList.sort((a: any, b: any) => a[field] > b[field] ? 1 : -1);

      if (order === 'desc') {
        userList = userList.reverse();
      }
    }

    return {  usersList: userList.slice(offset, limit), total: list.length -1 }
  }
}
