import { gql } from 'apollo-boost';
export const GET_ROOM = gql`
query getRoomList($type: String) {
  getRoomList(type:$type) {
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

export const GET_ROOM_AGE = gql`
  query getRoomAge($id: Int!) {
    getRoomAge(id: $id) {
      rslt
      data
    }
  }
`;

export const SIGN_ROOM = gql`
  mutation signRoom($roomId: Int!) {
    signRoom(roomId: $roomId) {
      rslt
      data
    }
  }
`;
export const SIGN_DEL = gql`
  mutation signDel($roomId: Int!) {
    signDel(roomId: $roomId) {
      rslt
      data
    }
  }
`;
export const SIGN_ROOM_CHECK = gql`
  query signRoomCheck($roomId: Int!) {
    signRoomCheck(roomId: $roomId) {
      rslt
      data
    }
  }
`;