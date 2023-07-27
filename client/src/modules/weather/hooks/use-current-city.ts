// import { currentCityVar } from "@/apollo/weather-vars";
// import { useCurrentUserQuery } from "@/gql";

// export function useCurrentCity() {
//     const {data} = useCurrentUserQuery();
//     const city = currentCityVar();

//     if (city !== ''){
//         return null
//     }

//     if (data.currentUser.cities.length > 0){
//         currentCityVar(data.currentUser.cities[0].fullname)
//     }

//     return null
// }