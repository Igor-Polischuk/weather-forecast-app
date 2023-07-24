import { Row, Col, Space } from "antd";
import { CurrentWeather } from "../CurrentMain";
import { Forecast } from "../Forecast";
import { InfoCard } from "@/modules/common/components/InfoCard";

import windImg from "@assets/wind.png";
import humidityImg from "@assets/humidity.png";
import pressureImg from "@assets/pressure.png";
import { WeatherCards } from "../WeatherCards";

import styles from "./styles.module.scss";
import { UserDropdown } from "@/modules/user/components/UserDropdown";
import { CloseOutlined } from "@ant-design/icons";

export const Weather = () => {
  return (
    <Row justify={"space-between"}>
      <Col md={16} xs={24}>
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <CurrentWeather />
          <Forecast />
          <Row justify={"space-between"} gutter={[16, 16]}>
            <Col span={8}>
              <InfoCard
                image={<img src={windImg} />}
                text="5.2 m/s"
                title="Wind"
              />
            </Col>
            <Col span={8}>
              <InfoCard
                image={<img src={humidityImg} />}
                text="75%"
                title="Humidity"
              />
            </Col>
            <Col span={8}>
              <InfoCard
                image={<img src={pressureImg} />}
                text="1015 hPa"
                title="Pressure"
              />
            </Col>
          </Row>
        </Space>
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
