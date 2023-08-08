import { CSSProperties, FC } from "react";
import { Card } from "antd";

import styles from "./style.module.scss";

interface IInfoCardProps {
  image: JSX.Element;
  text: string;
  title: string;
}

const cardBodyStyles: CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
};

export const InfoCardWithImage: FC<IInfoCardProps> = ({
  image,
  text,
  title,
}) => {
  return (
    <Card
      title={title}
      className={styles.card}
      bodyStyle={cardBodyStyles}
    >
      <div className={styles.cardContent}>
        {image}
        {text}
      </div>
    </Card>
  );
};
