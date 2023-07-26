import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { useCurrentUserQuery, useRemoveCityMutation, useSaveCityMutation } from "@/gql";

import styles from "./styles.module.scss";
import { useReactiveVar } from "@apollo/client";
import { currentCityVar } from "@/apollo/weather-vars";

export const SaveCityButton = () => {
  const { data } = useCurrentUserQuery();
  const currentCity = useReactiveVar(currentCityVar);
  const [removeCity] = useRemoveCityMutation();
  const [saveCity] = useSaveCityMutation();

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

  return isSavedCity ? (
    <RemoveCity onClick={onRemove} />
  ) : (
    <AddCity onClick={onSave} />
  );
};

const RemoveCity = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Remove city from cards" placement="right">
      <MinusCircleOutlined className={styles.btn} onClick={onClick} />
    </Tooltip>
  );
};

const AddCity = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Add city to cards" placement="right">
      <PlusCircleOutlined className={styles.btn} onClick={onClick} />
    </Tooltip>
  );
};
