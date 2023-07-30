import { Button } from "antd";

import {
  useCurrentUserQuery,
  useRemoveCityMutation,
  useSaveCityMutation,
} from "@/gql";

import { useReactiveVar } from "@apollo/client";
import { currentCityVar } from "@/apollo/weather-vars";

export const SaveCity = () => {
  const { data } = useCurrentUserQuery();
  const currentCity = useReactiveVar(currentCityVar);
  const [removeCity, { loading: removeLoading }] = useRemoveCityMutation();
  const [saveCity, { loading: saveLoading }] = useSaveCityMutation();
  const cityLimit = Number(import.meta.env.VITE_CITY_LIMIT);
  console.log(currentCity);

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
        Save city
      </Button>
    );
  }

  return !isSavedCity ? (
    <Button type="primary" block onClick={onSave} loading={saveLoading}>
      Save city
    </Button>
  ) : (
    <Button
      type="default"
      danger
      block
      onClick={onRemove}
      loading={removeLoading}
    >
      Remove city
    </Button>
  );
};
