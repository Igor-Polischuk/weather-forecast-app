import { Button } from "antd";
import { useCityManagement } from "../../hooks/useCityManagement";

export const SaveCity = () => {
  const {onSave, onRemove, loading, cityName, isSavedCity, cantSaveCity} = useCityManagement()

  return !isSavedCity ? (
    <Button type="primary" disabled={cantSaveCity} block onClick={onSave} loading={loading}>
      Save {cityName}
    </Button>
  ) : (
    <Button
      type="default"
      danger
      block
      onClick={onRemove}
      loading={loading}
    >
      Remove {cityName}
    </Button>
  );
};
