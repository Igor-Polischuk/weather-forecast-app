import { Card, Row } from "antd";
import { ForecastItem } from "./ForecastItem";

import styles from "./styles.module.scss";
import sunny from "@/assets/sunny.svg";

export const Forecast = () => {
  return (
    <Card className={styles.forecastWrapper}>
      <Row><p>Forecast</p></Row>
      <Row wrap={false} className={styles.forecastLine}>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
        <ForecastItem icon={<img src={sunny}/>} temperature={26} time="15:00"/>
      </Row>
    </Card>
  );
};
