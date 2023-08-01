import { gql } from "@apollo/client";

export const REMOVE_CITY = gql(`
  mutation RemoveCity($cityName: String!){
    cities: removeCity(city: $cityName){
      fullname
      lat
      lon
      name
  }
}
`);