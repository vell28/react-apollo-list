import gql from 'graphql-tag';

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation($id: ID!, $name: String!, $surname: String!, $age: String!, $email: String!) {
    updatedUser(id: $id, name: $name, surname: $surname, age: $age, email: $email) {
      id
      name
      surname
      age
      email
    }
  }
`;