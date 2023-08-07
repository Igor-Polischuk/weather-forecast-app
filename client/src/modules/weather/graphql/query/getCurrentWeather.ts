import { gql } from "@apollo/client";

export const CURRENT_WEATHER_QUERY = gql(`
  query getCurrentWeather($cityName: String!){
    currentWeather(WeatherInput: {
        city: $cityName
      }){
        weather{
            temperature
            feelsLike
            pressure
            humidity
            weatherCondition
            weatherDescription
            windSpeed 
            icon
          }
  }
}
`);