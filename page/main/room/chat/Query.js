import { gql } from 'apollo-boost';
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
