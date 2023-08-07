import { gql } from "@apollo/client";

export const SAVE_CITY_MUTATION = gql(`
  mutation SaveCity($cityName: String!){
    cities: saveCity(city: $cityName){
      fullname
      lat
      lon
      name
  }
}
`);