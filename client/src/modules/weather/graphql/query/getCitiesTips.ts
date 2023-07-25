import { gql } from "@apollo/client";

export const CITY_TIPS = gql(`
  query getCitiesTips($cityName: String!){
    getCitiesTips(cityName: $cityName){
        name
        fullname
        lat
        lon
  }
}
`);