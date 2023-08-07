import { gql } from "@apollo/client";

export const FORECAST_QUERY = gql(`
  query getForecast($cityName: String!){
    forecast(WeatherInput: {
        city: $cityName
      }){
        items {
          temperature
          icon
          pop
          date
          weatherCondition
          weatherDescription
          windSpeed
          pressure
          humidity
          }
  }
}
`);