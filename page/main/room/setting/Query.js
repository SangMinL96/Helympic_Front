import { gql } from 'apollo-boost';


export const GET_ROOM_INFO = gql`
  query getRoomInfo($roomId: Int!) {
    getRoomInfo(roomId: $roomId) {
      id
      title
      desc1
      master_id
      name
      avatar
      rDate
      hash_tag
      uCount
      age
    }
  }
`;
export const GET_ROOM_SIGN = gql`
  query getSignRoom($roomId: Int) {
    getSignRoom(roomId: $roomId) {
     id
     name
     avatar
     age
    }
  }
`;
export const EDIT_ROOM_INFO = gql`
  mutation roomInfoEdit($param:saveRoomInfoParams) {
    roomInfoEdit(param: $param) {
      rslt
      data
    }
  }
`;
export const EDIT_ROOM_AVATAR = gql`
  mutation editRoomAvatar($roomId:Int,$avatar:String) {
    editRoomAvatar(roomId: $roomId,avatar:$avatar) {
      rslt
      data
    }
  }
`;
export const SAVE_ROOM_SIGN = gql`
  mutation saveSignRoom($roomId:Int,$userId:String) {
    saveSignRoom(roomId: $roomId,userId:$userId) {
      rslt
      data
    }
  }
`;