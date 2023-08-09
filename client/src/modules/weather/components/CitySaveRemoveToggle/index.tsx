import { Button } from "antd";
import { useCityManagement } from "@modules/weather/hooks/useCityManagement";

export const CitySaveRemoveToggle = () => {
  const {onSave, onRemove, loading, isSavedCity, cantSaveCity} = useCityManagement();

  return !isSavedCity ? (
    <Button type="primary" disabled={cantSaveCity} block onClick={onSave} loading={loading}>
      Save
    </Button>
  ) : (
    <Button
      type="default"
      danger
      block
      onClick={() => onRemove()}
      loading={loading}
    >
      Remove
    </Button>
  );
};
