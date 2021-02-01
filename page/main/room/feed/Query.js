import { gql } from 'apollo-boost';
export const SAVE_ROOM_VIDEO = gql`
   mutation saveRoomVideo($param: saveRoomVideoParams) {
    saveRoomVideo(param: $param) {
      rslt
      data
    }
  }
`;
export const GET_ROOM_VIDEO = gql`
  query getRoomVideo($roomId: Int!) {
    getRoomVideo(roomId: $roomId) {
        name
        id
        videoId
        avatar
        video
        vCount
        checked
    }
  }
`;

export const SAVE_LIKE = gql`
   mutation saveLike($type: String , $videoId:Int) {
    saveLike(type: $type,videoId:$videoId) {
      rslt
      data
    }
  }
`;