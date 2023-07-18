import { useCurrentUserQuery } from "@/gql";
import { DownOutlined } from "@ant-design/icons";
import { Col, Dropdown, Input, MenuProps, Row, Space } from "antd";
import { Navigate } from "react-router-dom";

import styles from "./styles.module.scss";

export const WeatherHeader = () => {
  const { Search } = Input;

  const onSearch = (value: string) => console.log(value);
  const { data, error } = useCurrentUserQuery();

  const items: MenuProps["items"] = [
    {
      label: <a className={styles.logoutBtn} href="/weather">Log out</a>,
      key: "0",
    },
  ];

  if (error) {
    return <Navigate to="/login" />;
  }

  return (
    <Row align={"middle"} justify={"space-between"} style={{marginBottom: 30}}>
      <Col span={16}>
        <Search
          placeholder="Input city"
          onSearch={onSearch}
          enterButton
          allowClear
        />
      </Col>
      <Col span={8} style={{textAlign: 'right'}}>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {data?.currentUser.email}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
};
