import { gql } from "@apollo/client";

export const CURRENT_WEATHER = gql(`
  query getCurrentWeather($cityName: String!){
    currentWeather(WeatherInput: {
        city: $cityName
      }){
        weather{
            temperature
            feelsLike
            maxTemperature
            minTemperature
            pressure
            humidity
            weatherCondition
            weatherDescription
            windSpeed 
            icon
          }
          timezone {
            timezone
            sunrise
            sunset
          }
  }
}
`);