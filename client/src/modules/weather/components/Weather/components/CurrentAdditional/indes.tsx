import { InfoCard } from "@/modules/common/components/InfoCard";
import { Row, Col, Skeleton } from "antd";

import windImg from "@assets/wind.png";
import humidityImg from "@assets/humidity.png";
import pressureImg from "@assets/pressure.png";
import { FC } from "react";
import { useGetCurrentWeatherQuery } from "@/gql";

interface ICurrentAdditionalProps {
  cityName: string;
}

export const CurrentAdditional: FC<ICurrentAdditionalProps> = ({
  cityName,
}) => {
  const { data, loading } = useGetCurrentWeatherQuery({
    variables: { cityName },
  });

  if (loading) {
    return <Skeleton />;
  }

  if (!data?.currentWeather) {
    return null;
  }

  const weather = data.currentWeather.weather;

  return (
    <Row justify={"space-between"} gutter={[16, 16]}>
      <Col span={8}>
        <InfoCard image={<img src={windImg} />} text={`${weather.windSpeed} m/s`} title="Wind" />
      </Col>
      <Col span={8}>
        <InfoCard
          image={<img src={humidityImg} />}
          text={`${weather.humidity} %`}
          title="Humidity"
        />
      </Col>
      <Col span={8}>
        <InfoCard
          image={<img src={pressureImg} />}
          text={`${weather.pressure} hPa`}
          title="Pressure"
        />
      </Col>
    </Row>
  );
};
