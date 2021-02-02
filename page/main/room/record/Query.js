import { gql } from 'apollo-boost';

export const GET_RECORD_VIDEO = gql`
  query getRecordVideo($roomId: Int!) {
    getRecordVideo(roomId: $roomId) {
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

