import { InfoCard } from "@/modules/common/components/InfoCard";
import { Row, Col } from "antd";
import { FC } from "react";

import windImg from "@assets/wind.png";
import humidityImg from "@assets/humidity.png";
import pressureImg from "@assets/pressure.png";

interface IAdditionalWeatherInfoProps {
  windSpeed: number;
  humidity: number;
  pressure: number;
}

export const AdditionalWeatherInfo: FC<IAdditionalWeatherInfoProps> = ({
  windSpeed,
  humidity,
  pressure,
}) => {

    
  return (
    <Row justify={"space-between"} gutter={[16, 16]}>
      <Col span={8}>
        <InfoCard
          image={<img src={windImg} />}
          text={`${windSpeed} m/s`}
          title="Wind"
        />
      </Col>
      <Col span={8}>
        <InfoCard
          image={<img src={humidityImg} />}
          text={`${humidity} %`}
          title="Humidity"
        />
      </Col>
      <Col span={8}>
        <InfoCard
          image={<img src={pressureImg} />}
          text={`${pressure} hPa`}
          title="Pressure"
        />
      </Col>
    </Row>
  );
};
