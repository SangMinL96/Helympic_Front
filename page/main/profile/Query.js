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
export const GET_PROFILE = gql`
  query {
    getProfile {
      id
      name
      eml
      avatar
      rDate
      age
    }
  }
`;

export const NAME_CHECK = gql`
  mutation nameCheck($name: String!) {
    nameCheck(name: $name) {
      rslt
      data
    }
  }
`;

export const NAME_EDIT = gql`
  mutation userNameEdit($name: String) {
    userNameEdit(name: $name) {
      rslt
      data
    }
  }
`;
export const AVATAR_EDIT = gql`
  mutation userAvatarEdit($avatar: String) {
    userAvatarEdit(avatar: $avatar) {
      rslt
      data
    }
  }
`;
