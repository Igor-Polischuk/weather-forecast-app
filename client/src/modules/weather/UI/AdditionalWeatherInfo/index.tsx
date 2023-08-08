import { InfoCardWithImage } from "@/modules/common/components/InfoCardWithImage";
import { Row, Col } from "antd";
import { FC } from "react";

import humidityImg from "@assets/humidity.png";
import pressureImg from "@assets/pressure.png";
import windImg from "@assets/wind.png";
import styles from './styles.module.scss';

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
    <Row justify={"space-between"} gutter={[16, 16]} className={styles.cards}>
      <Col span={8}>
        <InfoCardWithImage
          image={<img src={windImg} />}
          text={`${Math.round(windSpeed)} m/s`}
          title="Wind"
        />
      </Col>
      <Col span={8}>
        <InfoCardWithImage
          image={<img src={humidityImg} />}
          text={`${humidity} %`}
          title="Humidity"
        />
      </Col>
      <Col span={8}>
        <InfoCardWithImage
          image={<img src={pressureImg} />}
          text={`${pressure} hPa`}
          title="Pressure"
        />
      </Col>
    </Row>
  );
};
