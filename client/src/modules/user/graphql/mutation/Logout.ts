import { gql } from "@apollo/client";

export const LOGOUT = gql(`
mutation LogOut{
    logout
  }
`)