import { gql } from "@apollo/client";

export const SAVE_CITY = gql(`
  mutation SaveCity($cityName: String!){
    cities: saveCity(city: $cityName){
      fullname
      lat
      lon
      name
  }
}
`);