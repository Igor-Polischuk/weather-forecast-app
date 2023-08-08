import { currentCityVar } from "@/apollo/weather-vars";
import { useReactiveVar } from "@apollo/client";
import { useSavedCityWeather } from "./useSavedCityWeather";

export function useDefaultCity() {
    const { weatherInfo, loading } = useSavedCityWeather();
    const cityName = useReactiveVar(currentCityVar);

    if (cityName === "" && weatherInfo.length > 0) {
        currentCityVar(weatherInfo[0].city);
    }

    const isCity = cityName.trim() !== '';

    return {cityName, loading, isCity}
}