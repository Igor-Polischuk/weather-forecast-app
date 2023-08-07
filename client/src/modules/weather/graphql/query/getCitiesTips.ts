import { gql } from "@apollo/client";

export const CITY_TIPS_QUERY = gql(`
  query getCitiesTips($cityName: String!){
    getCitiesTips(cityName: $cityName){
        name
        fullname
        lat
        lon
  }
}
`);