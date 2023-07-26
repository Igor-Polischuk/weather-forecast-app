import { Card, Space } from "antd";

import { useCurrentUserQuery } from "@/gql";
import { SavedCityWeatherCard } from "../WeatherCard";

import styles from "./style.module.scss";
import { animated, useTransition } from "@react-spring/web";

export const WeatherCards = () => {
  const { data } = useCurrentUserQuery();

  if (!data?.currentUser) {
    return <p>Something was wrong</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const weatherCards = useTransition(data.currentUser.cities, {
    key: (city: { fullname: string }) => city.fullname,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    }
  });

  return (
    <Card
      title="Saved cities"
      style={{ gap: 0 }}
      bodyStyle={{ overflowY: "auto", padding: 15 }}
      className={styles.cards}
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        {weatherCards((style, city) => (
          <animated.div style={style}>
            <SavedCityWeatherCard city={city} />
          </animated.div>
        ))}
      </Space>
    </Card>
  );
};
