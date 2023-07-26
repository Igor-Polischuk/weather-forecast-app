import { gql } from "@apollo/client";

export const SAVE_CITY = gql(`
  mutation saveCity($cityName: String!){
    saveCity(city: $cityName){
        id
       email
       cities {
    	 fullname
  	   }
   }
}
`);