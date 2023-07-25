import { InfoCard } from "@/modules/common/components/InfoCard";
import { Space, Row, Col } from "antd";

import { CurrentWeather } from "./components/CurrentMain";
import { Forecast } from "./components/Forecast";

import windImg from "@assets/wind.png";
import humidityImg from "@assets/humidity.png";
import pressureImg from "@assets/pressure.png";

export const Weather = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <CurrentWeather />
      <Forecast />
      <Row justify={"space-between"} gutter={[16, 16]}>
        <Col span={8}>
          <InfoCard image={<img src={windImg} />} text="5.2 m/s" title="Wind" />
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
  );
};
