import { gql } from "@apollo/client";

export const REMOVE_CITY = gql(`
  mutation removeCity($cityName: String!){
    removeCity(city: $cityName){
        id
       email
       cities {
    	 fullname
  	   }
   }
}
`);