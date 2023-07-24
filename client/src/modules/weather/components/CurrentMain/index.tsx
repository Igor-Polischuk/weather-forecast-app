import { Card, Col, Row, Tooltip } from "antd";

import styles from "./styles.module.scss";
import sunny from "@/assets/sunny.svg";
import { PlusCircleOutlined } from "@ant-design/icons";

export const CurrentWeather = () => {
  return (
    <Card className={styles.currentWeather}>
      <Row justify={"space-between"}>
        <Col span={10}>
          <div className={styles.cityName}>
            <p>Kyiv, UA</p>
            <Tooltip title="Add city to cards" placement="right">
              <PlusCircleOutlined className={styles.plus} />
            </Tooltip>
          </div>
          <p className={styles.temp}>
            30<span className={styles.tempSymbol}>°</span>
          </p>
          <p className={styles.addInfo}>30°/15° Feels like 32°</p>
        </Col>
        <Col span={8} className={styles.iconBlock}>
          <img src={sunny} alt="sunny" className={`${styles.weatherIcon} rotate`} />
          <p className={styles.weatherDescription}>Sunny, clear sky</p>
        </Col>
      </Row>
    </Card>
  );
};
