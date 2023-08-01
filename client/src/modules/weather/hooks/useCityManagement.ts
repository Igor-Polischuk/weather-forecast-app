import { currentCityVar } from "@/apollo/weather-vars";
import { useUserCitiesQuery, useRemoveCityMutation, useSaveCityMutation, RemoveCityMutation } from "@/gql";
import { USER_CITIES } from "@/modules/user/graphql/query/UserCities";
import { ApolloCache, FetchResult, useReactiveVar } from "@apollo/client";

const updateCityCache = (cache: ApolloCache<unknown>,
    result: Omit<FetchResult<RemoveCityMutation>, "context">) => {
    cache.writeQuery({
        query: USER_CITIES,
        data: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            cities: [...result.data!.cities],
        },
    });
};

export function useCityManagement() {
    const { data } = useUserCitiesQuery();
    const currentCity = useReactiveVar(currentCityVar);

    const [removeCity, { loading: removeLoading }] = useRemoveCityMutation({
        update: (cache, result) => updateCityCache(cache, result),
    });

    const [saveCity, { loading: saveLoading }] = useSaveCityMutation({
        update: (cache, result) => updateCityCache(cache, result),
    });

    const loading = removeLoading || saveLoading;

    const cityLimit = Number(import.meta.env.VITE_CITY_LIMIT);
    const cityName = currentCity.split(",")[0];

    const isSavedCity = !!data?.cities.find(
        (city) => city.fullname === currentCity
    );

    const onRemove = () => {
        removeCity({
            variables: { cityName: currentCity },
        });
    };

    const onSave = () => {
        saveCity({
            variables: { cityName: currentCity },
        });
    };

    const cantSaveCity = (data?.cities.length === cityLimit && !isSavedCity) ||
        currentCity === ""

    return {
        onSave,
        onRemove,
        loading,
        cantSaveCity,
        isSavedCity,
        cityName
    }
}