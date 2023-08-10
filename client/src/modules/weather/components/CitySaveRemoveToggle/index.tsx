import { Button, Spin } from "antd";
import { useCityManagement } from "@modules/weather/hooks/useCityManagement";
import { DeleteOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

export const CitySaveRemoveToggle = () => {
  const { onSave, onRemove, loading, isSavedCity, cantSaveCity } =
    useCityManagement();

  return !isSavedCity ? (
    <Button
      type="primary"
      disabled={cantSaveCity}
      block
      onClick={onSave}
      loading={loading}
    >
      Save
    </Button>
  ) : loading ? (
    <Spin size="small"/>
  ) : (
    <DeleteOutlined onClick={() => onRemove()} className={styles.remove} />
  );
};
