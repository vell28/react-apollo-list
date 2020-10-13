import { UsersProvider } from './users.provider';

export default {
  Query: {
    users: (_a: any, _args: any, { _, injector }: any) => injector.get(UsersProvider).getUsers({..._args}),
  },
  Mutation: {
    deleteUser: (_a: any, { id }: { id: string }, { _, injector }: any) => injector.get(UsersProvider).deleteUser(id),
    updatedUser: (_a: any, _args: any, { _, injector }: any) => injector.get(UsersProvider).updateUser({..._args})
    
  },
};
