import { Button } from "antd";

import {
  useCurrentUserQuery,
  useRemoveCityMutation,
  useSaveCityMutation,
} from "@/gql";

import { currentCityVar } from "@/apollo/weather-vars";
import { useReactiveVar } from "@apollo/client";

export const SaveCity = () => {
  const { data } = useCurrentUserQuery();
  const currentCity = useReactiveVar(currentCityVar);
  const [removeCity, { loading: removeLoading }] = useRemoveCityMutation();
  const [saveCity, { loading: saveLoading }] = useSaveCityMutation();

  const cityLimit = Number(import.meta.env.VITE_CITY_LIMIT);
  const cityName = currentCity.split(',')[0];

  if (!data?.currentUser) {
    return null;
  }

  const isSavedCity = !!data.currentUser.cities.find(
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

  if (
    (data.currentUser.cities.length === cityLimit && !isSavedCity) ||
    currentCity === ""
  ) {
    return (
      <Button type="primary" block disabled>
        Save {cityName} to cards
      </Button>
    );
  }

  return !isSavedCity ? (
    <Button type="primary" block onClick={onSave} loading={saveLoading}>
      Save {cityName} to cards
    </Button>
  ) : (
    <Button
      type="default"
      danger
      block
      onClick={onRemove}
      loading={removeLoading}
    >
      Remove {cityName} from cards
    </Button>
  );
};
