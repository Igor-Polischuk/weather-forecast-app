import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!){
  login(loginUserInput: {
    email: $email
    password: $password
  }){
    user{
      id
      email
    }
    access_token
  }
}
`;

export const REFRESH = gql(`
  mutation Refresh {
    refresh{
      access_token
    }
  }
`)
