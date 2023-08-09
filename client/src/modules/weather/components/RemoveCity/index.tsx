import { DeleteOutlined } from "@ant-design/icons";
import { useCityManagement } from "../../hooks/useCityManagement";
import { FC } from "react";
import { Spin } from "antd";

interface IRemoveCityProps {
  city: string;
}

export const RemoveCity: FC<IRemoveCityProps> = ({ city }) => {
  const { onRemove, loading } = useCityManagement();

  if (loading) {
    return <Spin size="small"/>;
  }

  return (
    <DeleteOutlined
      className="cardRemove"
      onClick={(e) => {
        e.stopPropagation();
        onRemove(city);
      }}
    />
  );
};
