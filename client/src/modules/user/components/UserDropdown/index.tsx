import { Dropdown, MenuProps, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";

import { useCurrentUserQuery } from "@/gql";
import { LogOut } from "@/modules/auth";


export const UserDropdown = () => {
  const { data, error } = useCurrentUserQuery();

  const items: MenuProps["items"] = [
    {
      label: (
        <LogOut/>
      ),
      key: "0",
    },
  ];

  if (error) {
    return <Navigate to="/login" />;
  }

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {data?.currentUser.email}
          <UserOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
