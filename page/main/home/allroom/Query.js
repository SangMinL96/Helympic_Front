import { gql } from 'apollo-boost';
export const GET_ROOM = gql`
  query {
    getRoomList {
      title
      id
      desc1
      master_id
      hash_tag
      name
      uCount
      rDate
    }
  }
`;