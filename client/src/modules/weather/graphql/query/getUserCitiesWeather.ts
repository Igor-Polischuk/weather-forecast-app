import { gql } from "@apollo/client";

export const USER_CITIES_WEATHER = gql`
  query WeatherInUserCities($page: Int!, $pageSize: Int!) {
    getCurrentWeatherInUserCities(UserCitiesCurrentWeatherInput: {
      page: $page
      pageSize: $pageSize
    }) {
      list {
        city {
          fullname
        }
        weatherInCity {
          weather {
            temperature
            feelsLike
            pressure
            humidity
            windSpeed
            weatherCondition
            weatherDescription
            icon
          }
        }
      }
      pageInfo {
        currentPage
        pageSize
        totalPages
        totalElements
      }
    }
  }
`;