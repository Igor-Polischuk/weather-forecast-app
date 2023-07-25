import { gql } from "@apollo/client";

export const CURRENT_WEATHER = gql(`
  query getForecast($cityName: String!){
    forecast(WeatherInput: {
        city: $cityName
      }){
        items {
            temperature
            pop
            date
            icon
          }
  }
}
`);