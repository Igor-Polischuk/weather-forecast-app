import { Row, Col } from "antd";
import { WeatherCards } from "../WeatherCards";

import { UserDropdown } from "@/modules/user/components/UserDropdown";
import { CloseOutlined } from "@ant-design/icons";
import { Weather } from "../Weather";

import styles from "./styles.module.scss";

export const WeatherDashboard = () => {
  return (
    <Row justify={"space-between"}>
      <Col md={16} xs={24}>
        <Weather/>
      </Col>
      <Col xs={0} md={7}>
        <div className={`${styles.sidebar}`}>
          <Row
            className={styles.sidebarTop}
            justify={"space-between"}
            align={"middle"}
          >
            <Col span={18}>
              <Row justify={"start"}>
                <UserDropdown />
              </Row>
            </Col>
            <Col span={5}>
              <Row justify={"end"}>
                <CloseOutlined className={styles.close} />
              </Row>
            </Col>
          </Row>
          <WeatherCards />
        </div>
      </Col>
    </Row>
  );
};
