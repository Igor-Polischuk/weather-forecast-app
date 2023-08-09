import { useRemoveCityMutation, useSaveCityMutation } from "@/gql";
import { useReactiveVar } from "@apollo/client";
import { currentCityVar } from "@/apollo/weather-vars";
import { useSavedCityWeather } from "./useSavedCityWeather";
import { updateCitiesWeatherCache } from "../helpers/update-cities-weather-cache";

interface IUseCityManagementReturningType {
  onSave: () => void;
  onRemove: (city?: string) => void;
  loading: boolean;
  cantSaveCity: boolean;
  isSavedCity: boolean;
}

export function useCityManagement(): IUseCityManagementReturningType {
  const { weatherInfo, total } = useSavedCityWeather();
  const currentCity = useReactiveVar(currentCityVar);

  const [removeCity, { loading: removeLoading }] = useRemoveCityMutation();
  const [saveCity, { loading: saveLoading }] = useSaveCityMutation();

  const loading = removeLoading || saveLoading;

  const cityLimit = Number(import.meta.env.VITE_CITY_LIMIT);

  const isSavedCity = !!weatherInfo.find((info) => info.city === currentCity);

  const onRemove = (city?: string) => {
    removeCity({
      variables: { cityName: city || currentCity },
      update: (cache) => updateCitiesWeatherCache({ cache, action: 'REMOVE', city: city || currentCity }),
    });
  };

  const onSave = () => {
    saveCity({
      variables: { cityName: currentCity },
      update: (cache) => updateCitiesWeatherCache({ cache, action: 'ADD', city: currentCity }),
    });
  };

  const cantSaveCity = (total === cityLimit && !isSavedCity) || currentCity === '';

  return {
    onSave,
    onRemove,
    loading,
    cantSaveCity,
    isSavedCity,
  };
}

