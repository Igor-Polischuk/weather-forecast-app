import React from "react";
import {Typography } from "antd";

import { LoginForm } from "@modules/auth";
import styles from "./styles.module.scss";

export const AuthPage: React.FC = () => {
  const { Title } = Typography;

  return (
    <div className={styles.auth_container}>
      <Title style={{marginBottom: 15}}>Sign in</Title>
      <LoginForm/>
    </div>
  );
};