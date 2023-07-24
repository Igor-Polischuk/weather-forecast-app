import { Card } from "antd";
import { FC } from "react";

import styles from "./style.module.scss";

interface IInfoCardProps {
  image: JSX.Element;
  text: string;
  title: string;
}

export const InfoCard: FC<IInfoCardProps> = ({ image, text, title }) => {
  return (
    <Card title={title} bodyStyle={{ paddingTop: 10, paddingBottom: 10 }}>
      <div className={styles.card}>
        {image}
        {text}
      </div>
    </Card>
  );
};