import { gql } from "@apollo/client";

export const USER_CITIES = gql(`
query UserCities{
    cities: getUserCities{
        fullname
        lat
        lon
        name
    }
}
`)