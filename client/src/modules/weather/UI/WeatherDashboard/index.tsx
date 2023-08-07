import { Row, Col } from "antd";

import { UserActionDropdown } from "@/modules/user/components/UserActionDropdown";
import { WeatherCards } from "../../components/WeatherCards";
import { Weather } from "../../components/Weather";
import { CloseOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

export const WeatherDashboard = () => {
  return (
    <Row justify={"space-between"}>
      <Col lg={16} md={14} xs={24}>
        <Weather/>
      </Col>
      <Col xs={0} md={9} lg={7}>
        <div className={`${styles.sidebar}`}>
          <Row
            className={styles.sidebarTop}
            justify={"space-between"}
            align={"middle"}
          >
            <Col span={18}>
              <Row justify={"start"}>
                <UserActionDropdown />
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
