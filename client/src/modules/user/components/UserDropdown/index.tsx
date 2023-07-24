import { Dropdown, MenuProps, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";

import { useCurrentUserQuery } from "@/gql";

import styles from "./styles.module.scss";

export const UserDropdown = () => {
  const { data, error } = useCurrentUserQuery();

  const items: MenuProps["items"] = [
    {
      label: (
        <a className={styles.logOut} href="/weather">
          Log out
        </a>
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
