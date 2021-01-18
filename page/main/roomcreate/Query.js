import { gql } from 'apollo-boost';


export const SAVE_ROOM = gql`
  mutation saveRoom($param: roomSaveParams) {
    saveRoom(param: $param) {
      rslt
      text
    }
  }
`;
