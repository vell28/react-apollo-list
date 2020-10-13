import gql from 'graphql-tag';

export const GET_USERS = gql`
  query($field: String, $order: String, $offset: Int, $limit: Int) {
    users(field: $field, order: $order, offset: $offset, limit: $limit) {
      usersList {
        id
        name
        surname
        age
        email
      }
      total
    }
  }
`;
