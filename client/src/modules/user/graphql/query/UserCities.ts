import { gql } from "@apollo/client";

export const USER_CITIES_QUERY = gql(`
query UserCities{
    cities: getUserCities{
        fullname
        lat
        lon
        name
    }
}
`)