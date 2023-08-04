import { Spin } from "antd";

import styles from './styles.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <Spin size="large" />
    </div>
  );
};
