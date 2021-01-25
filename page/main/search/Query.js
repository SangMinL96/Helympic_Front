import { gql } from 'apollo-boost';

export const SEARCH_ROOM = gql`
  mutation searchRoomList($text: String) {
    searchRoomList(text: $text) {
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