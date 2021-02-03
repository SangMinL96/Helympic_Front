import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
  mutation user( $param: userLogin) {
    user(param: $param) {
      id
      name
      token
    }
  }
`;
export const SAVE_USER = gql`
  mutation signUpUser( $param: userSaveParam) {
    signUpUser(param: $param) {
      rslt
      data
    }
  }
`;
export const ID_CHECK = gql`
  mutation idCheck( $id: String!) {
    idCheck( id: $id) {
      rslt
      data
    }
  }
`;
export const NAME_CHECK = gql`
  mutation nameCheck( $name: String!) {
    nameCheck( name: $name) {
      rslt
      data
    }
  }
`;