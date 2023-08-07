import { gql } from "@apollo/client";

export const REFRESH_MUTATION = gql(`
  mutation Refresh {
    refresh
  }
`)
