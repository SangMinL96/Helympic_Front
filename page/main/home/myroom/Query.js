import { gql } from 'apollo-boost';

export const GET_MY_ROOM = gql`
  mutation {
    getMyRoomList {
      title
      id
      desc1
      master_id
      hash_tag
      name
      uCount
      rDate
      avatar
    }
  }
`;
