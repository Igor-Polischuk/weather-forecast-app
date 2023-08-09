import { currentCityVar } from "@/apollo/weather-vars";
import { useReactiveVar } from "@apollo/client";
import { useSavedCityWeather } from "./useSavedCityWeather";
import { useEffect } from "react";

interface IUseDefaultCityReturningType {
    cityName: string;
    loading: boolean;
    isCity: boolean;
}

export function useDefaultCity(): IUseDefaultCityReturningType {
    const { weatherInfo, loading } = useSavedCityWeather();
    const cityName = useReactiveVar(currentCityVar);

    useEffect(() => {
        if (cityName === "" && weatherInfo.length > 0) {
            currentCityVar(weatherInfo[0].city);
        }
    })

    const isCity = cityName.trim() !== '';

    return { cityName, loading, isCity }
}