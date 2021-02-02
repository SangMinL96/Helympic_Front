import { gql } from 'apollo-boost';
export const GET_POP_VIDEO = gql`
  query {
    getPopVideo{
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